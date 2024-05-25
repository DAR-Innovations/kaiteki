package org.kaiteki.backend.integrations.modules.zoom.models.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CreateZoomSignatureDTO {
    private Long meetingRoomId;
    private int role;
}
