package org.kaiteki.backend.users.repository;

import org.kaiteki.backend.users.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UsersRepository extends
        CrudRepository<Users, Long>,
        PagingAndSortingRepository<Users, Long>,
        JpaSpecificationExecutor<Users> {
    Optional<Users> findByEmail(String email);

}