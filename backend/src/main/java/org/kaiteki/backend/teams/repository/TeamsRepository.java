package org.kaiteki.backend.teams.repository;

import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TeamsRepository extends
        JpaRepository<Teams, Long>,
        JpaSpecificationExecutor<Teams>,
        PagingAndSortingRepository<Teams, Long> {

    @Query(value = """
            SELECT t.*
            FROM teams t
            INNER JOIN team_members tm ON tm.team_id = t.id
            WHERE tm.user_id = :userId
           """, nativeQuery = true)
    List<Teams> findAllByUserId(Long userId);
}
