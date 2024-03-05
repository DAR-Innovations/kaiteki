package org.kaiteki.backend.files.repository;

import org.kaiteki.backend.files.model.TeamFiles;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamFilesRepository  extends
        JpaRepository<TeamFiles, Long>,
        JpaSpecificationExecutor<TeamFiles>,
        PagingAndSortingRepository<TeamFiles, Long> {
}
