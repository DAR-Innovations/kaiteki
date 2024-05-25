package org.kaiteki.backend.integrations.modules.zoom.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.CreateZoomMeetingDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomMeetingObjectDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.CreateZoomSignatureDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.ZoomMeetingDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.ZoomSignatureDTO;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    public ZoomSignatureDTO generateMeetingSignature(CreateZoomSignatureDTO dto) {
        return zoomAPIService.generateSignature(dto.getMeetingRoomId(), dto.getRole());
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