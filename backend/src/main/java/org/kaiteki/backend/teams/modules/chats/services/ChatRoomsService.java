package org.kaiteki.backend.teams.modules.chats.services;

import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.teams.modules.chats.models.dto.*;
import org.kaiteki.backend.teams.modules.chats.repository.ChatRoomsRepository;
import org.kaiteki.backend.teams.modules.chats.models.entity.ChatMessages;
import org.kaiteki.backend.teams.modules.chats.models.entity.ChatRooms;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessagesEventType;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatRoomsType;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.*;

import static java.util.Objects.isNull;

@Service
public class ChatRoomsService {
    private ChatRoomsRepository chatRoomsRepository;
    private TeamsService teamsService;
    private TeamMembersService teamMembersService;
    private ChatMessagesService chatMessagesService;

    @Autowired
    public void setTeamsService(TeamsService teamsService) {
        this.teamsService = teamsService;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setChatMessagesService(ChatMessagesService chatMessagesService) {
        this.chatMessagesService = chatMessagesService;
    }

    @Autowired
    public void setChatRoomsRepository(ChatRoomsRepository chatRoomsRepository) {
        this.chatRoomsRepository = chatRoomsRepository;
    }

    public List<ChatRoomsDTO> getChatRooms(Long teamId, ChatRoomsFilter filter) {
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(teamId);

        JpaSpecificationBuilder<ChatRooms> filterBuilder = new JpaSpecificationBuilder<ChatRooms>()
                .joinAndEqual("team", "id", teamId)
                .like("name", filter.getSearchValue());

        Sort sort = Sort.by(
                Sort.Order.desc("createdDate"),
                Sort.Order.desc("updatedDate")
        );

        filterBuilder.addSpecification(getContainsMemberSpecification(currentMember));

        List<ChatRooms> chatRooms = chatRoomsRepository.findAll(filterBuilder.build(), sort);

        return chatRooms.stream().map(item -> convertToDTO(item, currentMember)).toList();
    }

    private static Specification<ChatRooms> getContainsMemberSpecification(TeamMembers member) {
        return (root, query, criteriaBuilder) -> {
            Join<ChatRooms, TeamMembers> chatMembersJoin = root.join("chatMembers");
            return criteriaBuilder.equal(chatMembersJoin.get("id"), member.getId());
        };
    }

    public ChatRooms getChatRoom(Long chatRoomId) {
        return chatRoomsRepository.findById(chatRoomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found"));
    }

    public ChatRoomsDTO getChatRoomDTO(Long teamId, Long chatRoomId) {
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(teamId);

        return chatRoomsRepository.findById(chatRoomId)
                .map(item -> convertToDTO(item, currentMember))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found"));
    }

    @Transactional
    public void createChatRoom(Long teamId, CreateChatRoomDTO dto) {
        Teams team = teamsService.getTeamById(teamId);
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        List<TeamMembers> chatMembers = validateAndGetChatMembers(dto.getType(), dto.getTeamMembersIds(), team, currentMember);
        validateIfDirectChatExists(dto.getType(), chatMembers);

        String chatName = createChatRoomName(dto.getType(), chatMembers, dto.getName());

        ChatRooms chatRooms = ChatRooms.builder()
                .name(chatName)
                .createdDate(ZonedDateTime.now())
                .creatorTeamMember(currentMember)
                .type(dto.getType())
                .chatMembers(chatMembers)
                .team(team)
                .build();

        chatRoomsRepository.save(chatRooms);
    }

    private void validateIfDirectChatExists(ChatRoomsType type, List<TeamMembers> chatMembers) {
        if (type.equals(ChatRoomsType.DIRECT)) {
            if (chatMembers.size() != 2) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Must contain exactly two members");
            }

            Optional<ChatRooms> existingDirectChat = chatRoomsRepository.findByTypeAndChatMembersContainingAndChatMembersContaining(
                    ChatRoomsType.DIRECT,
                    chatMembers.get(0),
                    chatMembers.get(1)
            );

            if (existingDirectChat.isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Direct chat room already exists between these members");
            }
        }
    }

    private String createChatRoomName(ChatRoomsType type, List<TeamMembers> chatMembers, String defaultName) {
        if (type.equals(ChatRoomsType.DIRECT)) {
            if (chatMembers.size() != 2) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid size of direct chat");
            }

            TeamMembers firstMember = chatMembers.get(0);
            TeamMembers secondMember = chatMembers.get(1);

            return String.format("%s - %s",
                    UserFormattingUtils.getFullName(firstMember.getUser()),
                    UserFormattingUtils.getFullName(secondMember.getUser())
            );
        }

        return defaultName;
    }

    private List<TeamMembers> validateAndGetChatMembers(ChatRoomsType type, List<Long> chatMembersIds, Teams team, TeamMembers currentMember) {
        if (type.equals(ChatRoomsType.DIRECT)) {
            return validateAndGetDirectChatMembers(chatMembersIds, team, currentMember);
        } else if (type.equals(ChatRoomsType.GROUP)) {
            return validateAndGetGroupChatMembers(chatMembersIds, team, currentMember);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid chat type");
        }
    }

    private List<TeamMembers> validateAndGetDirectChatMembers(List<Long> chatMembersIds, Teams team, TeamMembers currentMember) {
        if (chatMembersIds.size() != 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Direct chat room can not contain more than 2 members");
        }

        TeamMembers receiverMember = teamMembersService.getTeamMemberById(chatMembersIds.get(0));
        if (!receiverMember.getTeam().getId().equals(team.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Chat members must be of the same team");
        }

        return List.of(currentMember, receiverMember);
    }

    private List<TeamMembers> validateAndGetGroupChatMembers(List<Long> chatMembersIds, Teams team, TeamMembers currentMember) {
        List<TeamMembers> chatMembers = new ArrayList<>();
        chatMembers.add(currentMember);

        chatMembersIds.forEach(id -> {
            TeamMembers teamMember = teamMembersService.getTeamMemberById(id);
            if (teamMember.getTeam().getId().equals(team.getId())) {
                chatMembers.add(teamMember);
            }
        });

        return chatMembers;
    }

    public ChatRoomsDTO convertToDTO(ChatRooms chatRoom, TeamMembers currentMember) {
        Optional<ChatMessageDTO> lastMessage = chatMessagesService.getLastChatMessage(chatRoom.getId());

        String lastMessageContent = lastMessage.map(ChatMessageDTO::getContent).orElseGet(() ->
                chatRoom.getType().equals(ChatRoomsType.GROUP) ? "Group created" : "Chat created"
        );
        ZonedDateTime lastMessageDate = lastMessage.map(ChatMessageDTO::getSentDate).orElse(chatRoom.getCreatedDate());
        List<TeamMembers> chatMembers = chatRoom.getChatMembers();
        List<Long> chatMembersIds = chatMembers.parallelStream().map(TeamMembers::getId).toList();

        return ChatRoomsDTO.builder()
                .id(chatRoom.getId())
                .name(getChatDisplayName(chatRoom, currentMember))
                .type(chatRoom.getType())
                .iconId(getChatDisplayIconId(chatRoom, currentMember))
                .size(chatMembers.size())
                .membersIds(chatMembersIds)
                .lastMessageContent(lastMessageContent)
                .lastMessageDate(lastMessageDate)
                .build();
    }

    private String getChatDisplayName(ChatRooms chatRoom, TeamMembers currentMember) {
        if (chatRoom.getType().equals(ChatRoomsType.DIRECT)) {
            Optional<TeamMembers> directMember = findDirectChatMember(chatRoom, currentMember);

            return directMember.map(member -> UserFormattingUtils.getFullName(member.getUser()))
                    .orElse(chatRoom.getName());
        } else {
            return chatRoom.getName();
        }
    }

    private Long getChatDisplayIconId(ChatRooms chatRoom, TeamMembers currentMember) {
        if (chatRoom.getType().equals(ChatRoomsType.DIRECT)) {
            Optional<TeamMembers> directMember = findDirectChatMember(chatRoom, currentMember);

            return directMember
                    .filter(member -> !isNull(member.getUser().getAvatarFile()))
                    .map(member -> member.getUser().getAvatarFile().getId())
                    .orElse(null);
        } else {
            return isNull(chatRoom.getIconFile()) ? null : chatRoom.getIconFile().getId();
        }
    }

    private Optional<TeamMembers> findDirectChatMember(ChatRooms chatRoom, TeamMembers currentMember) {
        return chatRoom.getChatMembers().stream()
                .filter(member -> !member.equals(currentMember))
                .findFirst();
    }

    @Transactional
    public void updateChatRoom(Long teamId, Long chatRoomId, UpdateChatRoomDTO dto) {
        Teams team = teamsService.getTeamById(teamId);
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        ChatRooms chatRoom = chatRoomsRepository.findById(chatRoomId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find chat room"));

        if (!chatRoom.getCreatorTeamMember().equals(currentMember)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The current member is not the owner");
        }

        if (StringUtils.isNotEmpty(dto.getName())) {
            chatRoom.setName(dto.getName());
        }

        if (!dto.getTeamMembersIds().isEmpty()) {
            List<TeamMembers> newMembers = validateAndGetChatMembers(chatRoom.getType(), dto.getTeamMembersIds(), team, currentMember);

            boolean areSimilar = new HashSet<>(newMembers).equals(new HashSet<>(chatRoom.getChatMembers()));
            if (!areSimilar) {
                chatRoom.setChatMembers(newMembers);
            }
        }

        chatRoom.setUpdatedDate(ZonedDateTime.now());
        chatRoomsRepository.save(chatRoom);
    }

    @Transactional
    public void deleteChatRoom(Long teamId, Long chatRoomId) {
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(teamId);

        ChatRooms chatRoom = chatRoomsRepository.findById(chatRoomId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found"));

        if (chatRoom.getType().equals(ChatRoomsType.GROUP)) {
            if (!chatRoom.getCreatorTeamMember().equals(currentMember)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The current member is not an owner of the chat room");
            }
        }

        chatRoomsRepository.delete(chatRoom);
    }
}
