package org.kaiteki.backend.teams.modules.meetings.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.teams.model.entity.TeamMembers;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "meeting_participants")
public class MeetingParticipants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "meeting_id")
    private Meetings meeting;

    @OneToOne
    @JoinColumn(name = "member_id")
    private TeamMembers member;

    @Column(name = "joined_time")
    private ZonedDateTime joinedTime;

    @Column(name = "left_time")
    private ZonedDateTime leftTime;
}
