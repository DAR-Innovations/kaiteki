package org.kaiteki.backend.integrations.modules.zoom.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ZoomSignatureDTO {
    private String signature;
}
