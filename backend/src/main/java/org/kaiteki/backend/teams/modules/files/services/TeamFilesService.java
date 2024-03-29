package org.kaiteki.backend.teams.modules.files.services;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.files.service.AppFilesService;
import org.kaiteki.backend.teams.modules.files.models.TeamFiles;
import org.kaiteki.backend.teams.modules.files.models.dto.TeamFilesDTO;
import org.kaiteki.backend.teams.modules.files.models.dto.TeamFilesFilter;
import org.kaiteki.backend.teams.modules.files.models.dto.UpdateTeamFileDTO;
import org.kaiteki.backend.teams.modules.files.models.dto.UploadTeamFileDTO;
import org.kaiteki.backend.teams.modules.files.repositories.TeamFilesRepository;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TeamFilesService {
    private final AppFilesService appFilesService;
    private final TeamsService teamsService;
    private final TeamMembersService teamMembersService;
    private final TeamFilesRepository teamFilesRepository;

    public void uploadFile(Long teamId, UploadTeamFileDTO dto) {
        Teams team = teamsService.getTeamById(teamId);
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(team);

        AppFiles file = appFilesService.uploadFile(dto.getFile());

        if (Strings.isEmpty(dto.getDescription())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description is required");
        }

        TeamFiles teamFiles = TeamFiles.builder()
                .file(file)
                .uploadedTeamMember(currentTeamMember)
                .createdDate(ZonedDateTime.now())
                .description(dto.getDescription())
                .team(team)
                .build();

        teamFilesRepository.save(teamFiles);
    }


    public Page<TeamFilesDTO> getTeamFilesDTO(Long teamId, TeamFilesFilter filter, Pageable pageable) {
        JpaSpecificationBuilder<TeamFiles> specificationBuilder = getTeamFilesSpecification(teamId, filter);
        return teamFilesRepository.findAll(specificationBuilder.build(), pageable).map(this::convertToDTO);
    }

    public void deleteTeamFile(Long teamId, Long id) {
        TeamFiles teamFile = getTeamFile(id);
        Teams team = teamsService.getTeamById(teamId);
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(team);

        if (!Objects.equals(teamId, teamFile.getTeam().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File does not belong to the team");
        }
        if (!Objects.equals(teamFile.getUploadedTeamMember().getId(), currentTeamMember.getId())
                || !Objects.equals(team.getOwner().getId(), currentTeamMember.getUser().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current user is not allowed to delete this file");
        }

        appFilesService.deleteById(teamFile.getFile().getId());
        teamFilesRepository.delete(teamFile);
    }

    public void updateTeamFile(Long teamId, Long id, UpdateTeamFileDTO dto) {
        TeamFiles teamFile = getTeamFile(id);
        Teams team = teamsService.getTeamById(teamId);
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(team);

        if (!Objects.equals(teamId, teamFile.getTeam().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File does not belong to the team");
        }
        if (!Objects.equals(teamFile.getUploadedTeamMember().getId(), currentTeamMember.getId())
                || !Objects.equals(team.getOwner().getId(), currentTeamMember.getUser().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current user is not allowed to update this file");
        }

        if (StringUtils.isNotEmpty(dto.getDescription())) {
            teamFile.setDescription(dto.getDescription());
        }
        if (StringUtils.isNotEmpty(dto.getFilename())) {
            AppFiles file = teamFile.getFile();
            file.setFilename(dto.getFilename());
            appFilesService.save(file);
        }

        teamFilesRepository.save(teamFile);
    }

    public TeamFiles getTeamFile(Long id) {
        return teamFilesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team file not found"));
    }

    private JpaSpecificationBuilder<TeamFiles> getTeamFilesSpecification(Long teamId, TeamFilesFilter filter) {
        JpaSpecificationBuilder<TeamFiles> specificationBuilder = new JpaSpecificationBuilder<TeamFiles>()
                .joinAndEqual("team", "id", teamId);

        if (StringUtils.isNotEmpty(filter.getSearchValue())) {
            String searchValue = filter.getSearchValue();

            Map<String, String> contentSearchValueMap = new HashMap<>();
            contentSearchValueMap.put("description", searchValue);
            Specification<TeamFiles> contentFilterSpec = new JpaSpecificationBuilder<TeamFiles>()
                    .orLike(contentSearchValueMap)
                    .build();

            Map<String, Object> fileSearchValueMap = new HashMap<>();
            fileSearchValueMap.put("filename", searchValue);
            Specification<TeamFiles> fileFilterSpec = new JpaSpecificationBuilder<TeamFiles>()
                    .orMultipleJoinLike(List.of("file"), fileSearchValueMap)
                    .build();

            Map<String, Object> authorSearchValueMap = new HashMap<>();
            authorSearchValueMap.put("firstname", searchValue);
            authorSearchValueMap.put("lastname", searchValue);
            Specification<TeamFiles> authorFilterSpec = new JpaSpecificationBuilder<TeamFiles>()
                    .orMultipleJoinLike(List.of("uploadedTeamMember", "user"), authorSearchValueMap)
                    .build();

            Specification<TeamFiles> combinedSearchValueSpec = Specification.where(contentFilterSpec)
                    .or(authorFilterSpec)
                    .or(fileFilterSpec);

            specificationBuilder.addSpecification(combinedSearchValueSpec);
        }

        return specificationBuilder;
    }

    public TeamFilesDTO convertToDTO(TeamFiles teamFile) {
        AppFiles file = teamFile.getFile();
        TeamMembers teamMember = teamFile.getUploadedTeamMember();

        return TeamFilesDTO.builder()
                .id(teamFile.getId())
                .guid(file.getGuid())
                .size(file.getSize())
                .fileId(file.getId())
                .authorTeamMemberId(teamMember.getId())
                .contentType(file.getContentType())
                .filename(file.getFilename())
                .createdDate(file.getCreatedDate())
                .description(teamFile.getDescription())
                .build();
    }
}
