package org.kaiteki.backend.teams.modules.posts.repository;

import org.kaiteki.backend.teams.modules.posts.models.entity.Posts;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostsRepository extends
        JpaRepository<Posts, Long>,
        PagingAndSortingRepository<Posts, Long>,
        JpaSpecificationExecutor<Posts> {

    Optional<Posts> findByIdAndTeam(Long postId, Teams team);
}
