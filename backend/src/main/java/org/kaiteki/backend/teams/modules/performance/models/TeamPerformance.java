package org.kaiteki.backend.teams.modules.performance.models;


import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "team_performance")
public class TeamPerformance {
    @Id
    private String id;

    @Field(value = "createdDate")
    private ZonedDateTime createdDate;

    @Field(value = "performance")
    private BigDecimal performance;

    @Field(value = "teamId")
    private Long teamId;
}
