package org.kaiteki.backend.teams.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.entity.MemberActivities;
import org.kaiteki.backend.teams.model.enums.ActivityType;
import org.kaiteki.backend.teams.repository.MemberActivitiesRepository;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class MemberActivitiesService {
    private final MemberActivitiesRepository activitiesRepository;

    @Async
    public void processActivity(TeamMembers member, ActivityType type) {
        switch (type) {
            case CRITICAL_TASK -> processCriticalTaskActivity(member);
            case MEDIUM_TASK -> processMediumTaskActivity(member);
            case EASY_TASK -> processEasyTaskActivity(member);
            case MEETINGS_ATTENDANT -> processMeetingsActivity(member);
            case MESSAGES_SENT -> processMessagesActivity(member);
        }
    }

    private void processCriticalTaskActivity(TeamMembers member) {}

    private void processMediumTaskActivity(TeamMembers member) {}

    private void processEasyTaskActivity(TeamMembers member) {}

    private void processMeetingsActivity(TeamMembers member) {}

    private void processMessagesActivity(TeamMembers member) {}

    public MemberActivities getLastActivity(TeamMembers teamMembers) {
        MemberActivities lastActivity = activitiesRepository
                .findLastActivityByTeamMemberId(teamMembers.getId())
                .orElse(null);

        if (isNull(lastActivity) || shouldCreateNewActivity(lastActivity)) {
            return createActivity(teamMembers);
        }

        return lastActivity;
    }

    public boolean shouldCreateNewActivity(MemberActivities lastActivity) {
        ZonedDateTime currentDate = ZonedDateTime.now();
        ZonedDateTime lastActivityDate = lastActivity.getPeriodDate();

        int lastActivityMonth = lastActivityDate.getMonthValue();
        int currentMonth = currentDate.getMonthValue();

        return lastActivityMonth != currentMonth;
    }

    public MemberActivities createActivity(TeamMembers teamMembers) {
        return activitiesRepository.save(
                MemberActivities.builder()
                .periodDate(ZonedDateTime.now())
                .attendantMeetingsCount(0)
                .criticalTasksCount(0)
                .easyTasksCount(0)
                .middleTasksCount(0)
                .messagesSentCount(0)
                .performance(0)
                .teamMember(teamMembers)
                .build()
        );
    }
}
