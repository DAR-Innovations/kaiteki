package org.kaiteki.backend.teams.modules.chats.repository;

import org.kaiteki.backend.teams.modules.chats.models.entity.ChatMessages;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessagesRepository extends MongoRepository<ChatMessages, String> {
    List<ChatMessages> findByChatIdOrderBySentDateAsc(Long chatRoomId);
    List<ChatMessages> findByChatId(Long chatRoomId);

    Optional<ChatMessages> findTopByChatIdOrderBySentDateDesc(Long chatId);
}
