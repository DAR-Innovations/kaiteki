package org.kaiteki.backend.integrations.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.models.IntegrationDetails;
import org.kaiteki.backend.integrations.models.Integrations;
import org.kaiteki.backend.integrations.models.dto.IntegrationCredentialsDTO;
import org.kaiteki.backend.integrations.models.dto.IntegrationsDTO;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.repository.IntegrationsRepository;
import org.kaiteki.backend.token.service.TokenService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.kaiteki.backend.users.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.UUID;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class IntegrationsService {
    private final CurrentSessionService currentSessionService;
    private final IntegrationsRepository integrationsRepository;
    private final UsersService usersService;

    public IntegrationsDTO getCurrentUsersIntegrations() {
        Long currentUserId = currentSessionService.getCurrentUserId();
        Integrations integrations = getIntegrationsByUser(currentUserId);

        return convertToDTO(integrations);
    }

    private Integrations getIntegrationsByUser(Long userId) {
        return integrationsRepository
                .findByUserId(userId)
                .orElseGet(() -> integrationsRepository.save(
                        Integrations.builder()
                                .spotify(null)
                                .telegram(null)
                                .github(null)
                                .key(UUID.randomUUID().toString())
                                .userId(userId)
                                .build())
                );
    }

    @Transactional
    public void toggleIntegrationState(PredefinedIntegrations integrationType, boolean enable) {
        Long currentUserId = currentSessionService.getCurrentUserId();

        Integrations integrations = integrationsRepository
                .findByUserId(currentUserId)
                .orElseGet(() -> integrationsRepository.save(Integrations.builder().userId(currentUserId).build()));

        switch (integrationType) {
            case SPOTIFY -> {
                IntegrationDetails spotifyIntegration = isNull(integrations.getSpotify())
                        ? IntegrationDetails.builder().build()
                        : integrations.getSpotify();

                updateIntegrationDetails(spotifyIntegration, enable);
                integrations.setSpotify(spotifyIntegration);
            }
            case GITHUB -> {
                IntegrationDetails githubIntegration = isNull(integrations.getGithub())
                        ? IntegrationDetails.builder().build()
                        : integrations.getGithub();

                updateIntegrationDetails(githubIntegration, enable);
                integrations.setGithub(githubIntegration);
            }
            case TELEGRAM -> {
                IntegrationDetails telegramIntegration = isNull(integrations.getTelegram())
                        ? IntegrationDetails.builder().build()
                        : integrations.getGithub();

                updateIntegrationDetails(telegramIntegration, enable);
                integrations.setTelegram(telegramIntegration);
            }
        }

        integrationsRepository.save(integrations);
    }

    @Transactional
    private void updateIntegrationDetails(IntegrationDetails integrationDetails, boolean enable) {
        if (integrationDetails == null) {
            integrationDetails = IntegrationDetails.builder().build();
        }
        integrationDetails.setEnabled(enable);
        if (enable) {
            integrationDetails.setDisabledDate(null);
            integrationDetails.setEnabledDate(ZonedDateTime.now());
        } else {
            integrationDetails.setDisabledDate(ZonedDateTime.now());
        }

    }

    public IntegrationsDTO convertToDTO(Integrations integrations) {
        return IntegrationsDTO.builder()
                .spotify(integrations.getSpotify())
                .telegram(integrations.getTelegram())
                .github(integrations.getGithub())
                .build();
    }

    public Users getUserByKey(String key) {
        Integrations integration = integrationsRepository.findByKey(key)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Integration credentials not found"));

        return usersService.getById(integration.getUserId());
    }

    public IntegrationCredentialsDTO getUserIntegrationCredentials() {
        Long currentUserId = currentSessionService.getCurrentUserId();
        Integrations integrations = getIntegrationsByUser(currentUserId);

        return IntegrationCredentialsDTO.builder()
                .key(integrations.getKey())
                .build();
    }
}
