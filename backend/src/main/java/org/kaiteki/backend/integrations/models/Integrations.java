package org.kaiteki.backend.integrations.models;

import com.mongodb.lang.Nullable;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


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
    @Nullable
    private IntegrationDetails spotify;

    @Field(value = "github")
    @Nullable
    private IntegrationDetails github;

    @Field(value = "user_id")
    @Indexed(unique = true)
    private Long userId;
}