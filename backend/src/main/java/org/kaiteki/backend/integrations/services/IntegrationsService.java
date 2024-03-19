package org.kaiteki.backend.integrations.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IntegrationsService {
    private final CurrentSessionService currentSessionService;
}
