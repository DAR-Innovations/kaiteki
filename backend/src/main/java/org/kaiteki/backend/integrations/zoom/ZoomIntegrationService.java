package org.kaiteki.backend.integrations.zoom;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.kaiteki.backend.integrations.zoom.models.ZoomSignatureRequest;
import org.kaiteki.backend.integrations.zoom.models.ZoomSignatureResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class ZoomIntegrationService {
    @Value("${integrations.zoom.sdk.key}")
    private String sdkKey;

    @Value("${integrations.zoom.sdk.secret}")
    private String sdkSecret;

    public ZoomSignatureResponse generateSignature(ZoomSignatureRequest request) {
        long iat = Math.round((float) new Date().getTime() / 1000) - 30;
        long exp = iat + 60 * 60 * 2;

        Map<String, Object> payload = new HashMap<>();
        payload.put("sdkKey", sdkKey);
        payload.put("mn", request.getMeetingRoomId());
        payload.put("role", request.getRole());
        payload.put("iat", iat);
        payload.put("exp", exp);
        payload.put("appKey", sdkKey);
        payload.put("tokenExp", exp);

        return ZoomSignatureResponse.builder()
                .signature(buildToken(payload, exp))
                .build();
    }

    private String buildToken(Map<String, Object> payload, long expiration) {
        return Jwts
                .builder()
                .claims(payload)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(sdkSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
