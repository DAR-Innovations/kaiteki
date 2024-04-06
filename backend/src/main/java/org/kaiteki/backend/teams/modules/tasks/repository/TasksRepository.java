package org.kaiteki.backend.teams.modules.tasks.repository;

import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends
        JpaRepository<Tasks, Long>,
        JpaSpecificationExecutor<Tasks>,
        PagingAndSortingRepository<Tasks, Long> {
    List<Tasks> findAllByTeamIn(List<Teams> teams);
    List<Tasks> findByExecutorMember_User(Users user, Sort sort);

}
