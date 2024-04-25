package org.kaiteki.backend.integrations.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.models.dto.IntegrationCredentialsDTO;
import org.kaiteki.backend.integrations.models.dto.IntegrationsDTO;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.kaiteki.backend.token.models.dto.TokenDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/integrations")
@RequiredArgsConstructor
public class IntegrationsController {
    private final IntegrationsService integrationsService;

    @GetMapping()
    public IntegrationsDTO getUserIntegrations() {
        return integrationsService.getCurrentUsersIntegrations();
    }

    @GetMapping("/credentials")
    public IntegrationCredentialsDTO getUserIntegrationCredentials() {
        return integrationsService.getUserIntegrationCredentials();
    }
}
