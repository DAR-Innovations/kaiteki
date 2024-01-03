package org.kaiteki.backend.chats.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.chats.models.dto.ChatRoomsDTO;
import org.kaiteki.backend.chats.models.dto.ChatRoomsFilter;
import org.kaiteki.backend.chats.models.entity.ChatRooms;
import org.kaiteki.backend.chats.repository.ChatRoomsRepository;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomsService {
    private final ChatRoomsRepository chatRoomsRepository;
    private final TeamsService teamsService;
    private final TeamMembersService teamMembersService;
    private final CurrentSessionService currentSessionService;

    public List<ChatRoomsDTO> getChatRooms(Long teamId, ChatRoomsFilter filter) {
        Teams team = teamsService.getTeam(teamId);

        Users currentUser = currentSessionService.getCurrentUser();
        TeamMembers currentMember = teamMembersService.getTeamMemberByTeamAndUser(team, currentUser);

        JpaSpecificationBuilder<ChatRooms> filterBuilder = new JpaSpecificationBuilder<ChatRooms>()
                .like("name", filter.getSearchValue());

        List<ChatRooms> chatRooms = chatRoomsRepository.findByTeamAndTeamMembersContains(team, currentMember, filterBuilder.build());

        return chatRooms.parallelStream().map(this::convertToDTO).toList();
    }

    public void createChatRoom(Long teamId)


    public ChatRoomsDTO convertToDTO(ChatRooms chatRoom) {
        return ChatRoomsDTO.builder()
                .id(chatRoom.getId())
                .name(chatRoom.getName())
                .type(chatRoom.getType())
                .build();
    }
}
