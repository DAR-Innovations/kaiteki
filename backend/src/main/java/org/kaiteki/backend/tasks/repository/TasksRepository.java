package org.kaiteki.backend.tasks.repository;

import org.kaiteki.backend.tasks.models.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends
        JpaRepository<Tasks, Long>,
        JpaSpecificationExecutor<Tasks>,
        PagingAndSortingRepository<Tasks, Long> {
}
