package org.kaiteki.backend.teams.files.repositories;

import org.kaiteki.backend.teams.files.models.TeamFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamFilesRepository  extends
        JpaRepository<TeamFiles, Long>,
        JpaSpecificationExecutor<TeamFiles>,
        PagingAndSortingRepository<TeamFiles, Long> {
}
