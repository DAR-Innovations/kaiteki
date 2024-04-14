package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Builder;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class ZoomMeetingObjectDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String uuid;
    private String assistant_id;
    private String host_email;
    private String registration_url;
    private String topic;
    private Integer type;
    private String start_time;
    private Integer duration;
    private String schedule_for;
    private String timezone;
    private String created_at;
    private String password;
    private String agenda;
    private String start_url;
    private String join_url;
    private String h323_password;
    private Integer pmi;
    private ZoomMeetingRecurrenceDTO recurrence;
    private List<ZoomMeetingTrackingFieldsDTO> tracking_fields;
    private List<ZoomMeetingOccurrenceDTO> occurrences;
    private ZoomMeetingSettingsDTO settings;

}
