package org.kaiteki.backend.integrations.zoom.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ZoomSignatureRequest {
    private Long meetingRoomId;
    private String role;
}
