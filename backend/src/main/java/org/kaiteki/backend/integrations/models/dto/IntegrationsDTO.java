package org.kaiteki.backend.integrations.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.integrations.models.IntegrationDetails;

@Data
@Builder
public class IntegrationsDTO {
    private IntegrationDetails spotify;
    private IntegrationDetails telegram;
    private IntegrationDetails github;
    private String key;
}
