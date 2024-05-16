package org.kaiteki.backend.integrations.modules.github.repositories;

import org.kaiteki.backend.integrations.modules.github.models.entities.GitHubCredentials;
import org.kaiteki.backend.integrations.modules.spotify.models.SpotifyCredentials;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface GitHubCredentialsRepository extends MongoRepository<GitHubCredentials, String> {
    Optional<GitHubCredentials> findByUserId(Long userId);
}
