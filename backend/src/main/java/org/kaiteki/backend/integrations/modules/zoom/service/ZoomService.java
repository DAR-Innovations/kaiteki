package org.kaiteki.backend.integrations.modules.zoom.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.CreateZoomMeetingDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomMeetingObjectDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.ZoomMeetingDTO;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class ZoomService {
    private final ZoomAPIService zoomAPIService;

    public ZoomMeetingDTO createZoomMeeting(CreateZoomMeetingDTO createDto) {
        ZoomMeetingObjectDTO meetingBuilderDTO = ZoomMeetingObjectDTO.builder()
                .agenda(createDto.getDescription())
                .topic(createDto.getTitle())
                .start_time(String.valueOf(createDto.getStartTime()))
                .host_email(createDto.getCreatorEmail())
                .timezone("UTC")
                .password(createDto.getPassword())
                .build();

        ZoomMeetingObjectDTO response = zoomAPIService.createMeeting(meetingBuilderDTO);

        return convertToDTO(response);
    }

    public ZoomMeetingDTO getZoomMeetingById(Long id) {
        ZoomMeetingObjectDTO response = zoomAPIService.getZoomMeetingById(id);
        return convertToDTO(response);
    }

    public ZoomMeetingDTO convertToDTO(ZoomMeetingObjectDTO objectDTO) {
        return ZoomMeetingDTO.builder()
                .zoomMeetingId(objectDTO.getId())
                .joinUrl(objectDTO.getJoin_url())
                .password(objectDTO.getPassword())
                .title(objectDTO.getTopic())
                .startTime(ZonedDateTime.parse(objectDTO.getStart_time()))
                .creatorEmail(objectDTO.getHost_email())
                .description(objectDTO.getAgenda())
                .createdDate(ZonedDateTime.parse(objectDTO.getCreated_at()))
                .build();
    }
}
