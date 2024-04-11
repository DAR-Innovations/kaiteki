package org.kaiteki.backend.shared.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Builder
@Data
public class ErrorResponseDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private int status;
    private String message;
    private ZonedDateTime timestamp;
}
