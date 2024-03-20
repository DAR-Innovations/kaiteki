package org.kaiteki.backend.integrations.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.models.IntegrationDetails;
import org.kaiteki.backend.integrations.models.Integrations;
import org.kaiteki.backend.integrations.models.dto.IntegrationsDTO;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.repository.IntegrationsRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class IntegrationsService {
    private final CurrentSessionService currentSessionService;
    private final IntegrationsRepository integrationsRepository;

    public IntegrationsDTO getCurrentUsersIntegrations() {
        Long currentUserId = currentSessionService.getCurrentUserId();

        Integrations integrations = integrationsRepository
                .findByUserId(currentUserId)
                .orElseGet(() -> integrationsRepository.save(Integrations.builder().userId(currentUserId).build()));

        return convertToDTO(integrations);
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
        }

        integrationsRepository.save(integrations);
    }

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
                .build();
    }
}
