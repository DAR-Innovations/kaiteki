package org.kaiteki.backend.integrations.models;

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
@Document(collection = "integrations")
public class Integrations {
    @Id
    private String id;

    @Field(value = "spotify")
    private String spotify;

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