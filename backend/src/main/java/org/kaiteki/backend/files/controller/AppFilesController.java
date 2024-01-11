package org.kaiteki.backend.files.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.files.model.dto.AppFilesDTO;
import org.kaiteki.backend.files.service.AppFilesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@RequestMapping("api/v1/files")
@RequiredArgsConstructor
public class AppFilesController {
    private final AppFilesService appFilesService;

    @GetMapping("/info/{guid}")
    @ResponseBody
    public ResponseEntity<AppFilesDTO> getFileInfo(@PathVariable String guid) {
        return ResponseEntity.ok(appFilesService.getByGuid(guid));
    }

    @DeleteMapping()
    public void deleteFile(@PathVariable String guid) {
        appFilesService.deleteByGuid(guid);
    }

    @GetMapping("/{fileId}")
    public StreamingResponseBody downloadFile(@PathVariable Long fileId,
                                              HttpServletResponse response) {
        return appFilesService.downloadFile(fileId, response);
    }
}
