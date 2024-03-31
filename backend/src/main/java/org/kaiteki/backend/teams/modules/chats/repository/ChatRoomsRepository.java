package org.kaiteki.backend.teams.modules.chats.repository;

import org.kaiteki.backend.teams.modules.chats.models.entity.ChatRooms;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatRoomsType;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

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
