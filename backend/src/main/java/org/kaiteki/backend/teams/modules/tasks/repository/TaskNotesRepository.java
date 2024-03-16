package org.kaiteki.backend.tasks.repository;

import org.kaiteki.backend.tasks.models.entity.TaskNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskNotesRepository extends
        JpaRepository<TaskNotes, Long>,
        JpaSpecificationExecutor<TaskNotes>,
        PagingAndSortingRepository<TaskNotes, Long> {
}
