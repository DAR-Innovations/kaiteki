package org.kaiteki.backend.teams.repository;

import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMembersRepository extends
        JpaRepository<TeamMembers, Long>,
        JpaSpecificationExecutor<TeamMembers>,
        PagingAndSortingRepository<TeamMembers, Long> {

    @Query(value = "SELECT COUNT(*) FROM team_members WHERE user_id = :userId AND team_id = :teamId", nativeQuery = true)
    int countUsersInTeam(Long userId, Long teamId);

    Optional<TeamMembers> findByTeamAndUser(Teams team, Users user);
    
    @Query(value = "SELECT team_members.id FROM team_members WHERE team_id = :teamId", nativeQuery = true)
    List<Long> findAllIdsByTeamId(Long teamId);

    long countByTeam(Teams team);
}
