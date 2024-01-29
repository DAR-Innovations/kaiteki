package org.kaiteki.backend.posts.repository;

import org.kaiteki.backend.posts.models.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostsRepository extends
        JpaRepository<Posts, Long>,
        PagingAndSortingRepository<Posts, Long>,
        JpaSpecificationExecutor<Posts> {
}
