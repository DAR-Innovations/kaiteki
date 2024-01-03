package org.kaiteki.backend.chats.repository;

import org.kaiteki.backend.chats.models.entity.ChatRooms;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.model.Teams;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomsRepository extends
        JpaRepository<ChatRooms, Long>,
        JpaSpecificationExecutor<ChatRooms>,
        PagingAndSortingRepository<ChatRooms, Long> {

    List<ChatRooms> findByTeamAndTeamMembersContains(Teams team, TeamMembers teamMember, Specification<ChatRooms> specification);
}
