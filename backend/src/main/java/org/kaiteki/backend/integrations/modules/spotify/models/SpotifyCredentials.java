package org.kaiteki.backend.integrations.modules.spotify.models;


import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "spotify_credentials")
public class SpotifyCredentials {
    @Id
    private String id;

    @Field(value = "access_token")
    private String accessToken;

    @Field(value = "refresh_token")
    private String refreshToken;

    @Field(value = "scope")
    private String scope;

    @Field(value = "expires_date")
    private ZonedDateTime expiresDate;

    @Field(value = "user_id")
    @Indexed(unique = true)
    private Long userId;
}
