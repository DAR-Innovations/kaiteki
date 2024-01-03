package org.kaiteki.backend.posts.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.posts.models.dto.PostsDTO;
import org.kaiteki.backend.posts.models.entity.LikedPosts;
import org.kaiteki.backend.posts.models.entity.Posts;
import org.kaiteki.backend.posts.repository.LikedPostsRepository;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikedPostsService {
    private final LikedPostsRepository likedPostsRepository;
    private final CurrentSessionService currentSessionService;
    private final TeamMembersService teamMembersService;
    private final PostsService postsService;


    public Page<PostsDTO> getLikedPosts(Pageable pageable) {
        Users currentUsers = currentSessionService.getCurrentUser();
        TeamMembers currentTeamMember = teamMembersService.getTeamMemberByUser(currentUsers);

        return likedPostsRepository.findByTeamMember(currentTeamMember, pageable)
                .map((likedPosts -> postsService.convertToDTO(likedPosts.getPost())));
    }

    @Transactional
    public void toggleLikePost(Long postId) {
        Users currentUsers = currentSessionService.getCurrentUser();
        TeamMembers currentTeamMember = teamMembersService.getTeamMemberByUser(currentUsers);

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
}
