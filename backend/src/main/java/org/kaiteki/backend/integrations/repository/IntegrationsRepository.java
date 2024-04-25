package org.kaiteki.backend.integrations.repository;

import org.kaiteki.backend.integrations.models.Integrations;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IntegrationsRepository extends MongoRepository<Integrations, String> {
    Optional<Integrations> findByUserId(Long userId);

    Optional<Integrations> findByKey(String key);
}

