package org.kaiteki.backend.teams.modules.posts.repository;

import org.kaiteki.backend.teams.modules.posts.models.entity.LikedPosts;
import org.kaiteki.backend.teams.modules.posts.models.entity.Posts;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikedPostsRepository extends
        JpaRepository<LikedPosts, Long>,
        PagingAndSortingRepository<LikedPosts, Long>,
        JpaSpecificationExecutor<LikedPosts> {

    Page<LikedPosts> findByTeamMember(TeamMembers teamMember, Pageable pageable);
    Optional<LikedPosts> findByTeamMemberAndPost(TeamMembers teamMember, Posts post);
}
