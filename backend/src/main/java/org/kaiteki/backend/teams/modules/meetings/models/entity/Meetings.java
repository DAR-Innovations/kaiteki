package org.kaiteki.backend.teams.modules.meetings.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.teams.modules.meetings.models.enums.MeetingsStatus;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;

import java.time.ZonedDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "meetings")
public class Meetings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "created_date", nullable = false)
    private ZonedDateTime createdDate;

    @Column(name = "updated_date")
    private ZonedDateTime updatedDate;

    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private MeetingsStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Teams team;

    @ManyToOne
    @JoinColumn(name = "created_member_id", nullable = false)
    private TeamMembers createdMember;

    @ManyToMany
    @JoinTable(name = "meeting_invited_members",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id"))
    private Set<TeamMembers> invitedMembers;

    @ManyToMany
    @JoinTable(name = "meeting_participated_members",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "participant_id"))
    private Set<MeetingParticipants> participatedMembers;
}
