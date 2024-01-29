package org.kaiteki.backend.chats.services;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.chats.models.dto.ChatMessageDTO;
import org.kaiteki.backend.chats.models.dto.CreateMessageDTO;
import org.kaiteki.backend.chats.models.dto.UpdateMessageDTO;
import org.kaiteki.backend.chats.models.entity.ChatMessages;
import org.kaiteki.backend.chats.models.enums.ChatMessageStatus;
import org.kaiteki.backend.chats.models.enums.ChatMessagesEventType;
import org.kaiteki.backend.chats.repository.ChatMessagesRepository;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
class ChatMessagesService {
    private final ChatMessagesRepository chatMessagesRepository;
    private final TeamMembersService teamMembersService;
    private final CurrentSessionService currentSessionService;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Transactional
    public ChatMessages createChatMessage(Long chatRoomId, CreateMessageDTO dto) {
        ChatMessages chatMessage = ChatMessages.builder()
                .chatId(chatRoomId)
                .type(dto.getType())
                .content(dto.getContent())
                .senderId(dto.getSenderId())
                .sentDate(ZonedDateTime.now())
                .status(ChatMessageStatus.DELIVERED)
                .build();

        return chatMessagesRepository.save(chatMessage);
    }

    @Transactional
    public void deleteMessage(String messageId) {
        Users currentUser = currentSessionService.getCurrentUser();
        TeamMembers currentMember = teamMembersService.getTeamMemberByUser(currentUser);

        ChatMessages message = getChatMessageById(messageId);
        if (!message.getSenderId().equals(currentMember.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message sender is not the current user");
        }

        chatMessagesRepository.delete(message);
    }

    public ChatMessages getChatMessageById(String id) {
        return chatMessagesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found"));
    }

    @Transactional
    public ChatMessages updateMessage(String messageId, UpdateMessageDTO dto) {
        ChatMessages message = getChatMessageById(messageId);

        if (StringUtils.isNotEmpty(dto.getContent())) {
            message.setContent(dto.getContent());
        }

        return chatMessagesRepository.save(message);
    }

    @Transactional
    public void readAllMessages(Long chatRoomId) {
        Users currentUser = currentSessionService.getCurrentUser();
        Long currentMemberId = teamMembersService.getTeamMemberByUser(currentUser).getId();

        Query query = new Query()
                .addCriteria(Criteria.where("chatId").is(chatRoomId))
                .addCriteria(Criteria.where("senderId").ne(currentMemberId));
        query.fields().include("_id").include("status");

        Update update = new Update().set("status", ChatMessageStatus.READ);
        mongoTemplate.updateMulti(query, update, ChatMessages.class);
    }

    public ChatMessageDTO convertToDTO(ChatMessages chatMessage) {
        TeamMembers sender = teamMembersService.getTeamMemberById(chatMessage.getSenderId());
        Users senderUser = sender.getUser();

        return ChatMessageDTO.builder()
                .id(chatMessage.getId())
                .content(chatMessage.getContent())
                .sentDate(chatMessage.getSentDate())
                .status(chatMessage.getStatus())
                .messageType(chatMessage.getType())
                .senderId(chatMessage.getSenderId())
                .senderFullName(UserFormattingUtils.getFullName(senderUser))
                .eventType(ChatMessagesEventType.MESSAGE)
                .build();
    }

    public List<ChatMessageDTO> getMessagesByChatRoomId(Long chatRoomId) {
        return chatMessagesRepository.findByChatIdOrderBySentDateAsc(chatRoomId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<ChatMessageDTO> getLastChatMessage(Long chatRoomId) {
        return chatMessagesRepository.findTopByChatIdOrderBySentDateDesc(chatRoomId)
                .map(this::convertToDTO);
    }
}
