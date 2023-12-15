package org.kaiteki.backend.files.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.files.model.dto.AppFilesDTO;
import org.kaiteki.backend.files.repository.AppFilesRepository;
import org.kaiteki.backend.users.models.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.*;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.channels.ReadableByteChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

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
    private final CurrentSessionService currentSessionService;

    public AppFiles saveFile(String filename, String contentType, InputStream dataInputStream) throws IOException {
        long fileSize = dataInputStream.available();
        if (fileSize >= this.maxFileSize) {
            throw new RuntimeException("The file is too large. Maximum allowed size is: " + this.maxFileSize);
        }

        Optional<Users> currentUser = currentSessionService.getCurrentUser();
        if (currentUser.isEmpty()) {
            throw new AccessDeniedException("User must be authenticated");
        }

        String guid = UUID.randomUUID().toString().replace("-", "");
        LocalDate date = LocalDate.now();
        String folder = storageFolder + File.separator + date.getYear() + File.separator + date.getMonth().getValue() + File.separator + date.getDayOfMonth();
        Path path = Paths.get(folder + File.separator + guid);

        Files.createDirectories(path.getParent());

        try (OutputStream fileOutputStream = new FileOutputStream(path.toFile())) {
            IOUtils.copyLarge(dataInputStream, fileOutputStream);

            AppFiles file = AppFiles.builder()
                    .user(currentUser.get())
                    .contentType(contentType)
                    .createdDate(LocalDate.now())
                    .filename(filename)
                    .guid(guid)
                    .path(path.toString())
                    .size(fileSize)
                    .build();

            return appFilesRepository.save(file);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save file: " + e.getMessage());
        }
    }

    public AppFilesDTO getByGuid(String guid) {
        return appFilesRepository
                .findByGuid(guid)
                .map(this::convertToAppFilesDTO)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    public AppFiles getById(Long id) {
        return appFilesRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    public void deleteByGuid(String guid) {
        Optional<AppFiles> file = appFilesRepository.findByGuid(guid);

        if (file.isEmpty()) {
            throw new RuntimeException("File with GUID " + guid + " not found");
        }

        Path filePath = Paths.get(file.get().getPath());
        try {
            Files.delete(filePath);
            appFilesRepository.deleteByGuid(guid);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + e.getMessage());
        }
    }

    public void deleteById(Long id) {
        appFilesRepository.deleteById(id);
    }

    public StreamingResponseBody downloadFile(String guid, HttpServletResponse response) {
        AppFiles file = appFilesRepository
                .findByGuid(guid)
                .orElseThrow(() -> new RuntimeException("File not found"));

        response.setHeader(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
        response.setHeader(HttpHeaders.PRAGMA, "no-cache");
        response.setHeader(HttpHeaders.EXPIRES, "0");
        response.setHeader(HttpHeaders.CONTENT_TYPE, file.getContentType());
        response.setHeader(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.getSize()));
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + sanitizeFileName(file.getFilename()) + "\"");
        response.setHeader(HttpHeaders.TRANSFER_ENCODING, "chunked");

        try {
            return outputStream -> {
                try (ReadableByteChannel channel = Files.newByteChannel(Path.of(file.getPath()), StandardOpenOption.READ);
                ) {
                    ByteBuffer buffer = ByteBuffer.allocate(DOWNLOAD_BUFFER_SIZE_IN_BYTES);
                    int bytesRead;
                    while ((bytesRead = channel.read(buffer)) > 0) {
                        buffer.flip();
                        outputStream.write(buffer.array(), 0, bytesRead);
                        buffer.clear();
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Failed to download file: " + e.getMessage());
                }
            };
        } catch (Exception e) {
            throw new RuntimeException("Failed to download file: " + e.getMessage());
        }
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
