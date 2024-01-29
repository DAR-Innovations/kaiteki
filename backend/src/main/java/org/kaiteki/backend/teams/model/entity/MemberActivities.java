package org.kaiteki.backend.teams.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member_activities")
public class MemberActivities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "period_date", nullable = false)
    private ZonedDateTime periodDate;

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
