package org.kaiteki.backend.integrations.modules.telegram.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.models.interfaces.IntegrationService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TelegramService implements IntegrationService {

    public Object onConnectIntegration() {
        return null;
    }

    public void onDisconnectIntegration() {
    }
}
