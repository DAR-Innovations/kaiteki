package org.kaiteki.backend.config;

import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.shared.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {
    @ExceptionHandler({ResponseStatusException.class})
    public ResponseEntity<ErrorResponseDTO> handleResponseStatusException(ResponseStatusException exception) {
        String message = StringUtils.isEmpty(exception.getMessage())
                ? "Internal server error"
                : exception.getReason();

        ErrorResponseDTO dto = ErrorResponseDTO.builder()
                .status(exception.getStatusCode().value())
                .message(message)
                .timestamp(ZonedDateTime.now())
                .build();

        return ResponseEntity
                .status(exception.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(dto);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponseDTO> handleGeneralException(Exception exception) {
        String message = StringUtils.isEmpty(exception.getMessage())
                ? "Internal server error"
                : exception.getMessage();

        ErrorResponseDTO dto = ErrorResponseDTO.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(message)
                .timestamp(ZonedDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(dto);
    }
}