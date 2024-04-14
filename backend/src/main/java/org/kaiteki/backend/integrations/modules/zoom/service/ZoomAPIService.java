package org.kaiteki.backend.integrations.modules.zoom.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomMeetingObjectDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomMeetingSettingsDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Service
public class ZoomAPIService {
    @Value("${integrations.zoom.client.id}")
    private String zoomUserId;
    @Value("${integrations.zoom.client.secret}")
    private String zoomApiSecret;


    public ZoomMeetingObjectDTO createMeeting(ZoomMeetingObjectDTO zoomMeetingObjectDTO) {
        String apiUrl = "https://api.zoom.us/v2/users/" + zoomUserId + "/meetings";

        ZoomMeetingSettingsDTO settingsDTO = new ZoomMeetingSettingsDTO();
        settingsDTO.setJoin_before_host(true);
        settingsDTO.setParticipant_video(false);
        settingsDTO.setHost_video(false);
        settingsDTO.setAuto_recording("cloud");
        settingsDTO.setMute_upon_entry(true);
        settingsDTO.setAllow_multiple_devices(false);
        settingsDTO.setMeeting_authentication(false);

        zoomMeetingObjectDTO.setSettings(settingsDTO);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + generateZoomJWTToken());
        headers.add("content-type", "application/json");

        HttpEntity<ZoomMeetingObjectDTO> httpEntity = new HttpEntity<>(zoomMeetingObjectDTO, headers);
        ResponseEntity<ZoomMeetingObjectDTO> zEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, httpEntity, ZoomMeetingObjectDTO.class);

        if(zEntity.getStatusCode().value() != 201) {
            throw new ResponseStatusException(zEntity.getStatusCode(), "Error while creating zoom meeting");
        }

        return zEntity.getBody();
    }

    public ZoomMeetingObjectDTO getZoomMeetingById(Long zoomMeetingId) {
        String getMeetingUrl = "https://api.zoom.us/v2/meetings/" + zoomMeetingId;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "Bearer " + generateZoomJWTToken());
        headers.add("content-type", "application/json");

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<ZoomMeetingObjectDTO> zoomEntityRes =  restTemplate
                .exchange(getMeetingUrl, HttpMethod.GET, requestEntity, ZoomMeetingObjectDTO.class);

        if(zoomEntityRes.getStatusCode().value() != 200) {
            throw new ResponseStatusException(zoomEntityRes.getStatusCode(), "Failed to get zoom meeting");
        }

        return zoomEntityRes.getBody();
    }

    private String generateZoomJWTToken() {
        String id = UUID.randomUUID().toString().replace("-", "");

        Date creation = new Date(System.currentTimeMillis());
        Date tokenExpiry = new Date(System.currentTimeMillis() + (1000 * 60));

        Key key = Keys.hmacShaKeyFor(zoomApiSecret.getBytes());

        return Jwts
                .builder()
                .id(id)
                .issuer(zoomUserId)
                .issuedAt(creation)
                .expiration(tokenExpiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
