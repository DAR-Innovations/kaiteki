package org.kaiteki.backend.integrations.modules.zoom.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomAccessTokenDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomMeetingObjectDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.api.ZoomMeetingSettingsDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.ZoomSignatureDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.util.Objects.isNull;

@Service
public class ZoomAPIService {
    @Value("${integrations.zoom.client.id}")
    private String zoomClientId;
    @Value("${integrations.zoom.client.secret}")
    private String zoomClientSecret;


    public ZoomMeetingObjectDTO createMeeting(ZoomMeetingObjectDTO zoomMeetingObjectDTO) {
        String apiUrl = "https://api.zoom.us/v2/users/me/meetings";

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
        headers.add("Authorization", "Bearer " + getAccessToken());
        headers.add("Content-type", "application/json");

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

        headers.add("Authorization", "Bearer " + getAccessToken());
        headers.add("content-type", "application/json");

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<ZoomMeetingObjectDTO> zoomEntityRes = restTemplate
                .exchange(getMeetingUrl, HttpMethod.GET, requestEntity, ZoomMeetingObjectDTO.class);

        if(zoomEntityRes.getStatusCode().value() != 200) {
            throw new ResponseStatusException(zoomEntityRes.getStatusCode(), "Failed to get zoom meeting");
        }

        return zoomEntityRes.getBody();
    }

    public ZoomSignatureDTO generateSignature(
            Long meetingNumber,
            int role
    ) {
        byte[] secretBytes = zoomClientSecret.getBytes(StandardCharsets.UTF_8);
        SecretKey secretKey = Keys.hmacShaKeyFor(secretBytes);

        long iat = System.currentTimeMillis();
        long exp = iat + 60 * 60 * 2;

        Map<String, String> claims = new HashMap<>();
        claims.put("appKey", zoomClientId);
        claims.put("sdkKey", zoomClientId);
        claims.put("mn", String.valueOf(meetingNumber));
        claims.put("role", String.valueOf(role));
        claims.put("iat", String.valueOf(iat));
        claims.put("exp", String.valueOf(exp));
        claims.put("tokenExp", String.valueOf(exp));

        String token = Jwts
                .builder()
                .claims(claims)
                .subject("Zoom Meeting " + meetingNumber)
                .issuedAt(new Date(iat))
                .expiration(new Date(exp))
                .signWith(secretKey)
                .compact();

        return ZoomSignatureDTO.builder()
                .signature(token)
                .build();
    }

    public ZoomSignatureDTO generateUserToken() {
        String code = "o5xedZwX5Er6x2ZXufhQwi_4-eaX0rwmw";

        try {
            // Create a RestTemplate with basic authentication for security
            RestTemplate restTemplate = new RestTemplate();
            // Set request parameters and headers
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("code", code);
            params.add("redirect_uri", "http://localhost:4200/");

            String auth = zoomClientId + ":" + zoomClientSecret;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.setBasicAuth(encodedAuth);

            // Execute the POST request and handle potential exceptions
            ResponseEntity<?> response = restTemplate.exchange(
                    "https://zoom.us/oauth/token", HttpMethod.POST,
                    new HttpEntity<>(params, headers), Map.class);

            System.out.println("TOOOOOKKKEEEN " + response.getBody());
            return null;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get zoom token: " + e.getMessage());
        }
    }


    public String getAccessToken() {
        String refreshToken = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjkzNTk2NjFjLWRlMGEtNDAzOC04NTYxLTkzZjJiMDg5MTA0NSJ9.eyJ2ZXIiOjksImF1aWQiOiI3ZjczZjRmMzE0ZTdhMGE5ZDMyMDAyZThjZjAzMzljNiIsImNvZGUiOiJvNXhlZFp3WDVFcjZ4MlpYdWZoUXdpXzQtZWFYMHJ3bXciLCJpc3MiOiJ6bTpjaWQ6bmcwcVpyUmtTSFdrbjFkVlNzOWpxUSIsImdubyI6MCwidHlwZSI6MSwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJmTjBpUks3R1E0bUJxVlgyblBKbDd3IiwibmJmIjoxNzE2MjE1Njc2LCJleHAiOjE3MjM5OTE2NzYsImlhdCI6MTcxNjIxNTY3NiwiYWlkIjoiTmxpeUFjbEJUVGFYZ3FzODNVUEsxUSJ9.H6FGvm02__rSxuZF0KM5UHkqVtjWW8xIHHlbm2VU_2F6vwIfIcr2gHPHUEuMm9Z_hlgATWmLk7IRm1zcZLWWow";

        try {
            // Create a RestTemplate with basic authentication for security
            RestTemplate restTemplate = new RestTemplate();
            // Set request parameters and headers
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "refresh_token");
            params.add("refresh_token", refreshToken);

            String auth = zoomClientId + ":" + zoomClientSecret;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.setBasicAuth(encodedAuth);

            // Execute the POST request and handle potential exceptions
            ResponseEntity<ZoomAccessTokenDTO> response = restTemplate.exchange(
                    "https://zoom.us/oauth/token", HttpMethod.POST,
                    new HttpEntity<>(params, headers), ZoomAccessTokenDTO.class);

            System.out.println("TOOOOOKKKEEEN " + response.getBody());

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get zoom token: Missing body");
            }

            return response.getBody().getAccessToken();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get zoom token: " + e.getMessage());
        }
    }

}