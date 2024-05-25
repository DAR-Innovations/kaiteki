package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
public class ZoomMeetingSettingsDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Boolean host_video;
    private Boolean participant_video;
    private Boolean cn_meeting;
    private Boolean in_meeting;
    private Boolean join_before_host;
    private Boolean mute_upon_entry;
    private Boolean watermark;
    private Boolean use_pmi;
    private Integer approval_type;
    private Integer registration_type;
    private String audio;
    private String auto_recording;
    private String alternative_hosts;
    private Boolean close_registration;
    private Boolean waiting_room;
    List<String> global_dial_in_countries;
    List<ZoomGlobalDialInNumbersDTO> global_dial_in_numbers;
    private Boolean registrants_email_notification;
    private String contact_name;
    private String contact_email;
    private Boolean registrants_confirmation_email;
    private Boolean meeting_authentication;
    private String authentication_option;
    private String authenticated_domains;
    private String authentication_name;
    private Boolean show_share_button;
    private Boolean allow_multiple_devices;
    private String encryption_type;
    public List<ZoomInterpreterDTO> interpreters;
}