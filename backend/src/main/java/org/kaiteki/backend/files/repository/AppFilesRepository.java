package org.kaiteki.backend.files.repository;

import org.kaiteki.backend.files.model.AppFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface AppFilesRepository extends
        JpaRepository<AppFiles, Long>,
        JpaSpecificationExecutor<AppFiles>,
        PagingAndSortingRepository<AppFiles, Long> {
}
