package org.kaiteki.backend.integrations.models.interfaces;

public interface IntegrationService {
    Object onConnectIntegration();
    void onDisconnectIntegration();

}

