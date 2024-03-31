package org.kaiteki.backend.teams.modules.performance.models;


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
@Document(collection = "team_performance_metrics")
public class TeamPerformanceMetrics {
    @Id
    private String id;

    @Field(value = "updatedDate")
    private ZonedDateTime updatedDate;

    @Field(value = "highPriorityTasks")
    private PerformanceMetricsSettings highPriorityTasks;

    @Field(value = "mediumPriorityTasks")
    private PerformanceMetricsSettings mediumPriorityTasks;

    @Field(value = "lowPriorityTasks")
    private PerformanceMetricsSettings lowPriorityTasks;

    @Field(value = "attendantMeetings")
    private PerformanceMetricsSettings attendantMeetings;

    @Field(value = "screenTimeMinutes")
    private PerformanceMetricsSettings screenTimeMinutes;

    @Field(value = "teamId")
    @Indexed(unique = true)
    private Long teamId;
}
