package org.kaiteki.backend.integrations.modules.github.models.entities;

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
@Document(collection = "github_credentials")
public class GitHubCredentials {
    @Id
    private String id;

    @Field(value = "access_token")
    private String accessToken;

    @Field(value = "expires_date")
    private ZonedDateTime expiresDate;

    @Field(value = "refresh_token")
    private String refreshToken;

    @Field(value = "scope")
    private String scope;

    @Field(value = "user_id")
    @Indexed(unique = true)
    private Long userId;
}