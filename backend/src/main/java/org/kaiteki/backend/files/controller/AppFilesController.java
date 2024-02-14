package org.kaiteki.backend.files.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.files.model.dto.AppFilesDTO;
import org.kaiteki.backend.files.model.dto.UploadFileDTO;
import org.kaiteki.backend.files.service.AppFilesService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class AppFilesController {
    private final AppFilesService appFilesService;

    @PostMapping
    public void uploadFile(@ModelAttribute UploadFileDTO dto) {
        appFilesService.uploadFile(dto.getFile());
    }

    @GetMapping("{id}/info")
    public ResponseEntity<AppFilesDTO> getFileInfo(@PathVariable Long id) {
        return ResponseEntity.ok(appFilesService.getDTOById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteFile(@PathVariable Long id) {
        appFilesService.deleteById(id);
    }

    @Cacheable(value = "file", key = "#fileId")
    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        try {
            return appFilesService.downloadFile(fileId);
        } catch (FileNotFoundException notFoundException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to download file");
        }
    }
}
