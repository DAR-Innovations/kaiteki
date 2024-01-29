package org.kaiteki.backend.notes.repository;

import org.kaiteki.backend.notes.model.Notes;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface NotesRepository extends CrudRepository<Notes, Long>,
        PagingAndSortingRepository<Notes, Long>,
        JpaSpecificationExecutor<Notes> {
}
