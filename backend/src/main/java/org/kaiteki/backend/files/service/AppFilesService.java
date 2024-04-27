package org.kaiteki.backend.files.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.files.model.dto.AppFilesDTO;
import org.kaiteki.backend.files.repository.AppFilesRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.*;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.channels.ReadableByteChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.util.Objects.isNull;

@Service
@Transactional
@RequiredArgsConstructor
public class AppFilesService {
    private final int DOWNLOAD_BUFFER_SIZE_IN_BYTES = 8192;

    @Value("${file.folder}")
    private String storageFolder;

    @Value("${file.max-size}")
    private Long maxFileSize;

    private final AppFilesRepository appFilesRepository;

    public AppFiles save(AppFiles file) {
        return appFilesRepository.save(file);
    }

    @Transactional
    public AppFiles uploadFile(MultipartFile file) {
        if (isEmpty(file)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        try (InputStream inputStream = file.getInputStream()) {
            return uploadFile(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    inputStream
            );
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image post");
        }
    }

    public boolean isEmpty(MultipartFile file) {
        return isNull(file) || file.isEmpty();
    }

    @Transactional
    private AppFiles uploadFile(String filename, String contentType, InputStream dataInputStream) throws IOException {
        long fileSize = dataInputStream.available();
        if (fileSize >= this.maxFileSize) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Maximum allowed size is: " + this.maxFileSize);
        }

        String guid = UUID.randomUUID().toString().replace("-", "");
        ZonedDateTime date = ZonedDateTime.now();
        String folder = storageFolder + File.separator + date.getYear() + File.separator + date.getMonth().getValue() + File.separator + date.getDayOfMonth();
        Path path = Paths.get(folder + File.separator + guid);

        Files.createDirectories(path.getParent());

        try (OutputStream fileOutputStream = new FileOutputStream(path.toFile())) {
            IOUtils.copyLarge(dataInputStream, fileOutputStream);

            AppFiles file = AppFiles.builder()
                    .contentType(contentType)
                    .createdDate(ZonedDateTime.now())
                    .filename(filename)
                    .guid(guid)
                    .path(path.toString())
                    .size(fileSize)
                    .build();

            return appFilesRepository.save(file);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save file");
        }
    }

    public AppFilesDTO getDTOById(Long id) {
        return appFilesRepository
                .findById(id)
                .map(this::convertToAppFilesDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found"));
    }

    public AppFiles getById(Long id) {
        return appFilesRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found"));
    }

    @Transactional
    public void deleteById(Long id)  {
        AppFiles file = getById(id);

        Path filePath = Paths.get(file.getPath());
        try {
            Files.delete(filePath);
            appFilesRepository.deleteById(id);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete file");
        }
    }

    @Transactional
    public void deleteAll(List<AppFiles> files) {
        appFilesRepository.deleteAll(files);

        files.forEach(file -> {
            Path filePath = Paths.get(file.getPath());

            try {
                Files.delete(filePath);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete file: " + e.getMessage());
            }
        });


    }

    public ResponseEntity<Resource> downloadFile(Long id) throws IOException {
        final AppFiles appFile = getById(id);
        final HttpHeaders httpHeaders = new HttpHeaders();
        final File file = new File(appFile.getPath());
        final byte[] fileContent = readBytesFromFile(file);

        httpHeaders.set(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
        httpHeaders.set(HttpHeaders.PRAGMA, "no-cache");
        httpHeaders.set(HttpHeaders.EXPIRES, "0");
        httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + sanitizeFileName(appFile.getFilename()) + "\"");

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .contentLength(fileContent.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new ByteArrayResource(fileContent));
    }

    private byte[] readBytesFromFile(File file) throws IOException {
        FileInputStream fileInputStream = null;
        byte[] bytesArray = null;

        try {
            bytesArray = new byte[(int) file.length()];
            fileInputStream = new FileInputStream(file);
            fileInputStream.read(bytesArray);
        } finally {
            if (fileInputStream != null) {
                fileInputStream.close();
            }
        }

        return bytesArray;
    }


    private String sanitizeFileName(String fileName) {
        String sanitizedFileName = fileName
                .replaceAll("\\s", "_");

        return URLEncoder.encode(sanitizedFileName, StandardCharsets.UTF_8);
    }

    public AppFilesDTO convertToAppFilesDTO(AppFiles file) {
        return AppFilesDTO.builder()
                .contentType(file.getContentType())
                .id(file.getId())
                .filename(file.getFilename())
                .guid(file.getGuid())
                .size(file.getSize())
                .createdDate(file.getCreatedDate())
                .build();
    }
}
