package org.kaiteki.backend.integrations.modules.spotify.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SpotifyLoginDTO {
    private String loginUrl;
}
