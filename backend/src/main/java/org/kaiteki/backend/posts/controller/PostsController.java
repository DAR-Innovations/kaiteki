package org.kaiteki.backend.posts.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.posts.models.dto.CreatePostDTO;
import org.kaiteki.backend.posts.models.dto.PostsDTO;
import org.kaiteki.backend.posts.models.dto.PostsFilterDTO;
import org.kaiteki.backend.posts.models.dto.UpdatePostDTO;
import org.kaiteki.backend.posts.services.LikedPostsService;
import org.kaiteki.backend.posts.services.PostsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostsController {
    private final PostsService postsService;
    private final LikedPostsService likedPostsService;

    @PostMapping()
    public void createPost(@RequestParam Long teamId, @ModelAttribute CreatePostDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        dto.setTeamId(teamId);
        postsService.createPost(dto);
    }

    @GetMapping("/liked")
    public Page<PostsDTO> getLikedPosts(
            @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
        return likedPostsService.getLikedPosts(pageable);
    }

    @PostMapping("/{postId}/like")
    public void toggleLikePost(@PathVariable Long postId) {
        likedPostsService.toggleLikePost(postId);
    }

    @GetMapping()
    public Page<PostsDTO> getPosts(@RequestParam Long teamId,
                                   @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable,
                                   PostsFilterDTO filter) {
        return postsService.getPosts(teamId, pageable, filter);
    }


    @GetMapping("/{postId}")
    public PostsDTO getPost(@PathVariable Long postId) {
        return postsService.getPostDTO(postId);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postsService.deletePost(postId);
    }

    @PutMapping("/{postId}")
    public void updatePost(@PathVariable Long postId, @ModelAttribute UpdatePostDTO dto) {
        postsService.updatePost(postId, dto);
    }
}
