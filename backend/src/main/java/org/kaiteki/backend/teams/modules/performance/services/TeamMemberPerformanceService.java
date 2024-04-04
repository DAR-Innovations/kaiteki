package org.kaiteki.backend.teams.modules.performance.services;

import jakarta.transaction.Transactional;
import org.kaiteki.backend.shared.utils.DateFormattingUtil;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformanceMetrics;
import org.kaiteki.backend.teams.modules.performance.models.dto.AddMemberPerformanceValuesDTO;
import org.kaiteki.backend.teams.modules.performance.models.enums.PerformanceMetricsType;
import org.kaiteki.backend.teams.modules.performance.reporisotiry.TeamMemberPerformanceRepository;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class TeamMemberPerformanceService {
    private TeamMemberPerformanceRepository teamMemberPerformanceRepository;
    private TeamMembersService teamMembersService;
    private TeamPerformanceMetricsService teamPerformanceMetricsService;
    private TeamPerformanceService teamPerformanceService;
    private MongoTemplate mongoTemplate;

    @Autowired
    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Autowired
    public void setTeamPerformanceMetricsService(TeamPerformanceMetricsService teamPerformanceMetricsService) {
        this.teamPerformanceMetricsService = teamPerformanceMetricsService;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setTeamMemberPerformanceRepository(TeamMemberPerformanceRepository teamMemberPerformanceRepository) {
        this.teamMemberPerformanceRepository = teamMemberPerformanceRepository;
    }

    @Autowired
    public void setTeamPerformanceService(TeamPerformanceService teamPerformanceService) {
        this.teamPerformanceService = teamPerformanceService;
    }

    @Transactional
    public TeamMemberPerformance setupDefaultPerformance(Long teamMemberId) {
        TeamMembers teamMember = teamMembersService.getTeamMemberById(teamMemberId);

        TeamMemberPerformance teamMemberPerformance = TeamMemberPerformance.builder()
                .highPriorityTasks(0)
                .mediumPriorityTasks(0)
                .lowPriorityTasks(0)
                .attendantMeetings(0)
                .screenTimeMinutes(0)
                .performance(BigDecimal.ZERO)
                .createdDate(DateFormattingUtil.setTimeToStartOfDay(ZonedDateTime.now()))
                .teamMemberId(teamMemberId)
                .teamId(teamMember.getTeam().getId())
                .build();

        return teamMemberPerformanceRepository.save(teamMemberPerformance);
    }

    @Transactional
    public TeamMemberPerformance getPerformance(Long teamMemberId) {
        ZonedDateTime oneMonthThreshold = DateFormattingUtil.setTimeToStartOfDay(
                ZonedDateTime.now().minusMonths(1));

        return teamMemberPerformanceRepository.findTopByTeamMemberIdOrderByCreatedDateDesc(teamMemberId)
                .filter(performance -> performance.getCreatedDate().isAfter(oneMonthThreshold))
                .orElseGet(() -> setupDefaultPerformance(teamMemberId));
    }

    @Async
    @Transactional
    public void calculateAndUpdatePerformance(Long teamMemberId) {
        TeamMembers teamMembers = teamMembersService.getTeamMemberById(teamMemberId);
        Teams team = teamMembers.getTeam();
        TeamPerformanceMetrics metrics = teamPerformanceMetricsService.getMetricsByTeamId(team.getId());
        TeamMemberPerformance teamMemberPerformance = getPerformance(teamMemberId);

        BigDecimal totalPerformance = BigDecimal.ZERO;

        if (metrics.getHighPriorityTasks().isEnabled()) {
            totalPerformance = totalPerformance.add(getFormulaPerformance(
                    metrics.getHighPriorityTasks().getWeight(),
                    metrics.getHighPriorityTasks().getNormalValue(),
                    teamMemberPerformance.getHighPriorityTasks()
            ));
        }
        if (metrics.getMediumPriorityTasks().isEnabled()) {
            totalPerformance = totalPerformance.add(getFormulaPerformance(
                    metrics.getMediumPriorityTasks().getWeight(),
                    metrics.getMediumPriorityTasks().getNormalValue(),
                    teamMemberPerformance.getMediumPriorityTasks()
            ));
        }
        if (metrics.getLowPriorityTasks().isEnabled()) {
            totalPerformance = totalPerformance.add(getFormulaPerformance(
                    metrics.getLowPriorityTasks().getWeight(),
                    metrics.getLowPriorityTasks().getNormalValue(),
                    teamMemberPerformance.getLowPriorityTasks()
            ));
        }
        if (metrics.getAttendantMeetings().isEnabled()) {
            totalPerformance = totalPerformance.add(getFormulaPerformance(
                    metrics.getAttendantMeetings().getWeight(),
                    metrics.getAttendantMeetings().getNormalValue(),
                    teamMemberPerformance.getAttendantMeetings()
            ));
        }
        if (metrics.getScreenTimeMinutes().isEnabled()) {
            totalPerformance = totalPerformance.add(getFormulaPerformance(
                    metrics.getScreenTimeMinutes().getWeight(),
                    metrics.getScreenTimeMinutes().getNormalValue(),
                    teamMemberPerformance.getScreenTimeMinutes()
            ));
        }

        teamMemberPerformance.setPerformance(totalPerformance);
        teamMemberPerformanceRepository.save(teamMemberPerformance);
    }

    @Transactional
    public void calculateAndUpdatePerformance(List<Long> teamMemberIds) {
        teamMemberIds.forEach(this::calculateAndUpdatePerformance);
    }

    @Transactional
    public void addMemberPerformanceValues(Long teamMemberId, AddMemberPerformanceValuesDTO dto) {
        TeamMemberPerformance teamMemberPerformance = getPerformance(teamMemberId);
        Teams team = teamMembersService.getTeamMemberById(teamMemberId).getTeam();

        if (nonNull(dto.getHighPriorityTasks())) {
            int newValue = teamMemberPerformance.getHighPriorityTasks() + dto.getHighPriorityTasks();
            teamMemberPerformance.setHighPriorityTasks(newValue);
        }
        if (nonNull(dto.getMediumPriorityTasks())) {
            int newValue = teamMemberPerformance.getMediumPriorityTasks() + dto.getMediumPriorityTasks();
            teamMemberPerformance.setMediumPriorityTasks(newValue);
        }
        if (nonNull(dto.getLowPriorityTasks())) {
            int newValue = teamMemberPerformance.getLowPriorityTasks() + dto.getLowPriorityTasks();
            teamMemberPerformance.setLowPriorityTasks(newValue);
        }
        if (nonNull(dto.getAttendantMeetings())) {
            int newValue = teamMemberPerformance.getAttendantMeetings() + dto.getAttendantMeetings();
            teamMemberPerformance.setAttendantMeetings(newValue);
        }
        if (nonNull(dto.getScreenTimeMinutes())) {
            int newValue = teamMemberPerformance.getScreenTimeMinutes() + dto.getScreenTimeMinutes();
            teamMemberPerformance.setScreenTimeMinutes(newValue);
        }

        teamMemberPerformanceRepository.save(teamMemberPerformance);
        calculateAndUpdatePerformance(teamMemberId);
        teamPerformanceService.calculateAndUpdatePerformance(team.getId());
    }

    private BigDecimal getFormulaPerformance(BigDecimal weight, int normalValue, int value) {
        return weight.multiply(BigDecimal.valueOf(value / normalValue));
    }

    public List<TeamMemberPerformance> getPerformancesInPeriodDate(Long teamId, ZonedDateTime startDate, ZonedDateTime endDate) {
        Query query = new Query(
                Criteria.where("teamId").is(teamId)
                        .andOperator(
                                Criteria.where("createdDate").lte(endDate),
                                Criteria.where("createdDate").gte(startDate)
                        )
        );

        return mongoTemplate.find(query, TeamMemberPerformance.class);
    }

    public void deleteByTeamMember(Long teamMemberId) {
        teamMemberPerformanceRepository.deleteAllByTeamMemberId(teamMemberId);
    }

    public void deleteByTeamId(Long teamId) {
        teamMemberPerformanceRepository.deleteAllByTeamId(teamId);
    }
}
