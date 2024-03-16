package org.kaiteki.backend.chats.repository;

import org.kaiteki.backend.chats.models.entity.ChatRooms;
import org.kaiteki.backend.chats.models.enums.ChatRoomsType;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomsRepository extends
        JpaRepository<ChatRooms, Long>,
        JpaSpecificationExecutor<ChatRooms>,
        PagingAndSortingRepository<ChatRooms, Long> {
    Optional<ChatRooms> findByTypeAndChatMembersContainingAndChatMembersContaining(
            ChatRoomsType type,
            TeamMembers member1,
            TeamMembers member2
    );
}
