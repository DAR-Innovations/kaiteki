package org.kaiteki.backend.teams.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.teams.model.TeamMembers;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activities")
public class Activities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "period_date", nullable = false)
    private LocalDateTime periodDate;

    @Column(name = "critical_tasks_count", nullable = false)
    private Integer  criticalTasksCount;

    @Column(name = "middle_tasks_count", nullable = false)
    private Integer  middleTasksCount;

    @Column(name = "easy_tasks_count", nullable = false)
    private Integer  easyTasksCount;

    @Column(name = "attendant_meetings_count", nullable = false)
    private Integer  attendantMeetingsCount;

    @Column(name = "messages_sent_count", nullable = false)
    private Integer  messagesSentCount;

    @Column(name = "performance", nullable = false)
    private Integer  performance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_member_id")
    @JsonIgnore
    private TeamMembers teamMember;
}
