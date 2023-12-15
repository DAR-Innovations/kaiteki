package org.kaiteki.backend.tasks.repository;

import org.kaiteki.backend.tasks.models.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskStatusRepository extends
        JpaRepository<TaskStatus, Long>,
        JpaSpecificationExecutor<TaskStatus>,
        PagingAndSortingRepository<TaskStatus, Long> {
}
