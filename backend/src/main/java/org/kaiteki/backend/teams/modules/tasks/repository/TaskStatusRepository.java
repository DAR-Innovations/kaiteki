package org.kaiteki.backend.tasks.repository;

import org.kaiteki.backend.tasks.models.entity.TaskStatus;
import org.kaiteki.backend.tasks.models.entity.TaskStatusType;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskStatusRepository extends
        JpaRepository<TaskStatus, Long>,
        JpaSpecificationExecutor<TaskStatus>,
        PagingAndSortingRepository<TaskStatus, Long> {


    List<TaskStatus> findByTeamAndType(Teams team, TaskStatusType type);
}
