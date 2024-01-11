package org.kaiteki.backend.shared.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class ErrorResponseDTO {
    private int status;
    private String message;
    private ZonedDateTime timestamp;
}
