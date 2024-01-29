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
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostsController {
    private final PostsService postsService;
    private final LikedPostsService likedPostsService;

    @PostMapping()
    public void createPost(@ModelAttribute CreatePostDTO dto) {
        postsService.createPost(dto);
    }

    @GetMapping("/liked")
    public Page<PostsDTO> createPost(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return likedPostsService.getLikedPosts(pageable);
    }

    @PostMapping("/{postId}/liked")
    public void toggleLikePost(@PathVariable Long postId) {
        likedPostsService.toggleLikePost(postId);
    }

    @GetMapping()
    public Page<PostsDTO> createPost(@RequestParam Long teamId,
                                     @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,
                                     PostsFilterDTO filter) {
        return postsService.getPosts(teamId, pageable, filter);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postsService.deletePost(postId);
    }

    @PutMapping("/{postId}")
    public void updatePost(@PathVariable Long postId, UpdatePostDTO dto) {
        postsService.updatePost(postId, dto);
    }
}
