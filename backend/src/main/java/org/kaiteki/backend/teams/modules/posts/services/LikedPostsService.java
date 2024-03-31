package org.kaiteki.backend.teams.modules.posts.services;

import org.kaiteki.backend.teams.modules.posts.models.dto.PostsDTO;
import org.kaiteki.backend.teams.modules.posts.models.entity.LikedPosts;
import org.kaiteki.backend.teams.modules.posts.models.entity.Posts;
import org.kaiteki.backend.teams.modules.posts.repository.LikedPostsRepository;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LikedPostsService {
    private LikedPostsRepository likedPostsRepository;
    private TeamMembersService teamMembersService;
    private PostsService postsService;

    @Autowired
    public void setLikedPostsRepository(LikedPostsRepository likedPostsRepository) {
        this.likedPostsRepository = likedPostsRepository;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setPostsService(PostsService postsService) {
        this.postsService = postsService;
    }


    public Page<PostsDTO> getLikedPosts(Long teamId, Pageable pageable) {
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(teamId);

        return likedPostsRepository.findByTeamMember(currentTeamMember, pageable)
                .map((likedPosts -> postsService.convertToDTO(likedPosts.getPost(), false)));
    }

    @Transactional
    public void toggleLikePost(Long teamId, Long postId) {
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(teamId);

        Posts post = postsService.getPost(postId);

        Optional<LikedPosts> existingLike = likedPostsRepository.findByTeamMemberAndPost(currentTeamMember, post);

        if (existingLike.isEmpty()) {
            LikedPosts like = LikedPosts.builder()
                    .post(post)
                    .teamMember(currentTeamMember)
                    .build();

            likedPostsRepository.save(like);
        } else {
            likedPostsRepository.delete(existingLike.get());
        }
    }

    public boolean isPostLiked(Long postId, Long teamId) {
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(teamId);

        Posts post = postsService.getPost(postId);

        Optional<LikedPosts> existingLike = likedPostsRepository.findByTeamMemberAndPost(currentTeamMember, post);

        return existingLike.isPresent();
    }
}
