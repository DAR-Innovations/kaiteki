package org.kaiteki.backend.posts.services;

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
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;


@Service
public class PostsService {
    private PostsRepository postsRepository;
    private TeamMembersService teamMembersService;
    private TeamsService teamsService;
    private CurrentSessionService currentSessionService;
    private AppFilesService appFilesService;
    private LikedPostsService likedPostsService;

    @Autowired
    public void setPostsRepository(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setTeamsService(TeamsService teamsService) {
        this.teamsService = teamsService;
    }

    @Autowired
    public void setCurrentSessionService(CurrentSessionService currentSessionService) {
        this.currentSessionService = currentSessionService;
    }

    @Autowired
    public void setAppFilesService(AppFilesService appFilesService) {
        this.appFilesService = appFilesService;
    }

    @Autowired
    public void setLikedPostsService(LikedPostsService likedPostsService) {
        this.likedPostsService = likedPostsService;
    }

    @Transactional
    public void createPost(CreatePostDTO dto) {
        Teams team = teamsService.getTeamById(dto.getTeamId());
        TeamMembers teamMember = teamMembersService.getCurrentTeamMember(team);

        AppFiles imageFile = Optional.ofNullable(dto.getImage())
                .map(appFilesService::uploadFile)
                .orElse(null);

        Posts post = Posts.builder()
                .createdDate(ZonedDateTime.now())
                .title(dto.getTitle())
                .content(dto.getContent())
                .description(dto.getDescription())
                .team(team)
                .authorTeamMember(teamMember)
                .heroImage(imageFile)
                .build();

        postsRepository.save(post);
    }

    public PostsDTO getPostDTO(Long postId, Long teamId) {
        Teams team = teamsService.getTeamById(teamId);

        return postsRepository.findByIdAndTeam(postId, team)
                .map(post -> convertToDTO(post, true))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
    }

    public Posts getPost(Long postId , Long teamId) {
        Teams team = teamsService.getTeamById(teamId);

        return postsRepository.findByIdAndTeam(postId, team)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
    }

    public Posts getPost(Long postId) {
        return postsRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
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
                .map(post -> convertToDTO(post, false));
    }

    public PostsDTO convertToDTO(Posts post, boolean includeContent) {
        TeamMembers authorTeamMember = post.getAuthorTeamMember();
        Users authorUser = authorTeamMember.getUser();
        Optional<AppFiles> heroImage = Optional.ofNullable(post.getHeroImage());
        boolean isPostLiked = likedPostsService.isPostLiked(post.getId(), post.getTeam().getId());

        return PostsDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .authorFullName(UserFormattingUtils.getFullName(authorUser))
                .authorMemberId(authorUser.getId())
                .content(includeContent ? post.getContent() : null)
                .createdDate(post.getCreatedDate())
                .description(post.getDescription())
                .heroImageId(heroImage.map(AppFiles::getId).orElse(null))
                .isLiked(isPostLiked)
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
        if (isNull(dto.getImage()) && nonNull(post.getHeroImage())) {
            appFilesService.deleteById(post.getHeroImage().getId());
            post.setHeroImage(null);
        }
        if (nonNull(dto.getImage())) {
            AppFiles newImage = appFilesService.uploadFile(dto.getImage());
            post.setHeroImage(newImage);
        }

        postsRepository.save(post);
    }

    private Posts validatePostAuthorForCurrentUser(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND ,"Post not found"));

        Users currentUser = currentSessionService.getCurrentUser();
        Users postAuthorUser = post.getAuthorTeamMember().getUser();

        if (!currentUser.getId().equals(postAuthorUser.getId())) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The current user is not the author of post");
        }

        return post;
    }
}
