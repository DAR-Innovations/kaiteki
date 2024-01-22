package org.kaiteki.backend.integrations.zoom.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ZoomSignatureResponse {
    private String signature;
}
