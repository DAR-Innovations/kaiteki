package org.kaiteki.backend.posts.services;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.files.service.AppFilesService;
import org.kaiteki.backend.posts.models.entity.Posts;
import org.kaiteki.backend.posts.models.dto.CreatePostDTO;
import org.kaiteki.backend.posts.models.dto.PostsDTO;
import org.kaiteki.backend.posts.models.dto.PostsFilterDTO;
import org.kaiteki.backend.posts.models.dto.UpdatePostDTO;
import org.kaiteki.backend.posts.repository.PostsRepository;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.isNull;


@Service
@RequiredArgsConstructor
public class PostsService {
    private final PostsRepository postsRepository;
    private final TeamMembersService teamMembersService;
    private final TeamsService teamsService;
    private final CurrentSessionService currentSessionService;
    private final AppFilesService appFilesService;

    @Transactional
    public void createPost(CreatePostDTO dto) {
        Users user = currentSessionService.getCurrentUser();
        Teams team = teamsService.getTeam(dto.getTeamId());
        TeamMembers teamMember = teamMembersService.getTeamMemberByTeamAndUser(team, user);

        AppFiles imageFile = null;
        if (!isNull(dto.getImage()) && !dto.getImage().isEmpty()) {
            try (InputStream inputStream = dto.getImage().getInputStream()) {
                imageFile = appFilesService.saveFile(
                        dto.getImage().getOriginalFilename(),
                        dto.getImage().getContentType(),
                        inputStream
                );
            } catch (IOException e) {
                throw new RuntimeException("Failed to save file");
            }
        }

        Posts post = Posts.builder()
                .createdDate(LocalDateTime.now())
                .title(dto.getTitle())
                .content(dto.getContent())
                .description(dto.getDescription())
                .team(team)
                .authorTeamMember(teamMember)
                .heroImage(imageFile)
                .build();

        postsRepository.save(post);
    }

    public PostsDTO getPostDTO(Long postId) {
        return postsRepository.findById(postId)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Posts getPost(Long postId) {
        return postsRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Page<PostsDTO> getPosts(Long teamId, Pageable pageable, PostsFilterDTO filter) {
        JpaSpecificationBuilder<Posts> filterBuilder = new JpaSpecificationBuilder<Posts>()
                .joinAndEqual("team", "id", teamId);

        if (StringUtils.isNotEmpty(filter.getSearchValue())) {
            String searchValue = filter.getSearchValue();

            Map<String, String> contentSearchValueMap = new HashMap<>();
            contentSearchValueMap.put("title", searchValue);
            contentSearchValueMap.put("description", searchValue);
            Specification<Posts> contentFilterSpec = new JpaSpecificationBuilder<Posts>()
                    .orLike(contentSearchValueMap)
                    .build();

            Map<String, Object> authorSearchValueMap = new HashMap<>();
            authorSearchValueMap.put("firstname", searchValue);
            authorSearchValueMap.put("lastname", searchValue);
            Specification<Posts> authorFilterSpec = new JpaSpecificationBuilder<Posts>()
                    .orMultipleJoinLike(List.of("authorTeamMember", "user"), authorSearchValueMap)
                    .build();

            Specification<Posts> combinedSearchValueSpec = Specification.where(contentFilterSpec)
                    .or(authorFilterSpec);

            filterBuilder.addSpecification(combinedSearchValueSpec);
        }

        return postsRepository.findAll(filterBuilder.build(), pageable)
                .map(this::convertToDTO);
    }

    public PostsDTO convertToDTO(Posts post) {
        TeamMembers authorTeamMember = post.getAuthorTeamMember();
        Users authorUser = authorTeamMember.getUser();

        return PostsDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .authorFullName(UserFormattingUtils.getFullName(authorUser))
                .content(post.getContent())
                .createdDate(post.getCreatedDate())
                .description(post.getDescription())
                .build();
    }

    @Transactional
    public void deletePost(Long postId) {
        Posts post = validatePostAuthorForCurrentUser(postId);
        postsRepository.delete(post);
    }

    @Transactional
    public void updatePost(Long postId, UpdatePostDTO dto) {
        Posts post = validatePostAuthorForCurrentUser(postId);

        if (StringUtils.isNotEmpty(dto.getTitle())) {
            post.setTitle(dto.getTitle());
        }
        if (StringUtils.isNotEmpty(dto.getContent())) {
            post.setContent(dto.getContent());
        }
        if (StringUtils.isNotEmpty(dto.getDescription())) {
            post.setDescription(dto.getDescription());
        }

        postsRepository.save(post);
    }

    private Posts validatePostAuthorForCurrentUser(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Users currentUser = currentSessionService.getCurrentUser();
        Users postAuthorUser = post.getAuthorTeamMember().getUser();

        if (!currentUser.getId().equals(postAuthorUser.getId())) {
            throw new RuntimeException("The current user is not the author of post");
        }

        return post;
    }
}
