package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Data;

@Data
public class ZoomMeetingTrackingFieldsDTO {
    public String field;
    public String value;
    public Boolean visible;

}