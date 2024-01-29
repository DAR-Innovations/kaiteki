package org.kaiteki.backend.teams.repository;

import org.kaiteki.backend.teams.model.entity.TeamsInvitations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamsInvitationsRepository extends
        JpaRepository<TeamsInvitations, Long>,
        JpaSpecificationExecutor<TeamsInvitations>,
        PagingAndSortingRepository<TeamsInvitations, Long> {

    Optional<TeamsInvitations> findByToken(String token);
}
