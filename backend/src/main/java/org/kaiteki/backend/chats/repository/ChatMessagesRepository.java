package org.kaiteki.backend.chats.repository;

import org.kaiteki.backend.chats.models.entity.ChatMessages;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessagesRepository extends MongoRepository<ChatMessages, String> {
    List<ChatMessages> findByChatIdOrderBySentDateAsc(Long chatRoomId);
    List<ChatMessages> findByChatId(Long chatRoomId);

    Optional<ChatMessages> findTopByChatIdOrderBySentDateDesc(Long chatId);
}
