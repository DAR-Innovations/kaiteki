package org.kaiteki.backend.teams.modules.chats.services;

import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.chats.models.dto.TeamsChatNotificationDTO;
import org.kaiteki.backend.teams.modules.chats.models.entity.ChatRooms;
import org.kaiteki.backend.teams.modules.chats.models.enums.TeamsChatNotificationType;
import org.kaiteki.backend.teams.modules.chats.repository.ChatMessagesRepository;
import org.kaiteki.backend.teams.modules.chats.models.dto.ChatMessageDTO;
import org.kaiteki.backend.teams.modules.chats.models.dto.CreateMessageDTO;
import org.kaiteki.backend.teams.modules.chats.models.dto.UpdateMessageDTO;
import org.kaiteki.backend.teams.modules.chats.models.entity.ChatMessages;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessageStatus;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessagesEventType;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class ChatMessagesService {
    private ChatMessagesRepository chatMessagesRepository;
    private TeamMembersService teamMembersService;
    private MongoTemplate mongoTemplate;
    private SimpMessagingTemplate simpMessagingTemplate;
    private ChatRoomsService chatRoomsService;

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setChatMessagesRepository(ChatMessagesRepository chatMessagesRepository) {
        this.chatMessagesRepository = chatMessagesRepository;
    }

    @Autowired
    public void setChatRoomsService(ChatRoomsService chatRoomsService) {
        this.chatRoomsService = chatRoomsService;
    }

    @Autowired
    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Autowired
    public void setSimpMessagingTemplate(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Transactional
    public void sendMessage(Long chatRoomId, CreateMessageDTO dto) {
        ChatRooms chatRoom = chatRoomsService.getChatRoom(chatRoomId);
        Teams currentTeam = chatRoom.getTeam();

        ChatMessages chatMessage = createChatMessage(chatRoomId, dto);
        ChatMessageDTO createdChatMessage = convertToDTO(chatMessage);

        TeamsChatNotificationDTO teamsChatNotificationDTO = TeamsChatNotificationDTO.builder()
                .teamId(currentTeam.getId())
                .chatRoomId(currentTeam.getId())
                .type(TeamsChatNotificationType.NEW_MESSAGE)
                .timestamp(ZonedDateTime.now())
                .build();

        simpMessagingTemplate.convertAndSend("/chats/" + chatRoomId + "/messages", createdChatMessage);
        simpMessagingTemplate.convertAndSend("/chats/teams/" + currentTeam.getId() + "/notifications", teamsChatNotificationDTO);

    }

    @Transactional
    public void deleteMessage(Long teamId, Long chatRoomId, String messageId) {
        deleteMessage(teamId, messageId);
        ChatRooms chatRoom = chatRoomsService.getChatRoom(chatRoomId);
        Teams currentTeam = chatRoom.getTeam();

        ChatMessageDTO dto = ChatMessageDTO.builder()
                .eventType(ChatMessagesEventType.DELETE)
                .id(messageId)
                .build();

        TeamsChatNotificationDTO teamsChatNotificationDTO = TeamsChatNotificationDTO.builder()
                .teamId(currentTeam.getId())
                .chatRoomId(currentTeam.getId())
                .type(TeamsChatNotificationType.DELETE_MESSAGE)
                .timestamp(ZonedDateTime.now())
                .build();

        simpMessagingTemplate.convertAndSend("/chats/" + chatRoomId + "/messages", dto);
        simpMessagingTemplate.convertAndSend("/chats/teams/" + currentTeam.getId() + "/notifications", teamsChatNotificationDTO);
    }

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
    public void deleteMessage(Long teamId, String messageId) {
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(teamId);

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
    public void updateMessage(Long chatRoomId, String messageId, UpdateMessageDTO updateMessageDTO) {
        ChatRooms chatRoom = chatRoomsService.getChatRoom(chatRoomId);
        Teams currentTeam = chatRoom.getTeam();

        ChatMessages updatedChatMessage = updateMessage(messageId, updateMessageDTO);

        ChatMessageDTO dto = ChatMessageDTO.builder()
                .eventType(ChatMessagesEventType.UPDATE)
                .content(updatedChatMessage.getContent())
                .id(messageId)
                .build();

        TeamsChatNotificationDTO teamsChatNotificationDTO = TeamsChatNotificationDTO.builder()
                .teamId(currentTeam.getId())
                .chatRoomId(currentTeam.getId())
                .type(TeamsChatNotificationType.UPDATE_MESSAGE)
                .timestamp(ZonedDateTime.now())
                .build();

        simpMessagingTemplate.convertAndSend("/chats/" + chatRoomId + "/messages", dto);
        simpMessagingTemplate.convertAndSend("/chats/teams/" + currentTeam.getId() + "/notifications", teamsChatNotificationDTO);
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
    public void readAllMessages(Long teamId, Long chatRoomId) {
        Long currentMemberId = teamMembersService.getCurrentTeamMember(teamId).getId();

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
