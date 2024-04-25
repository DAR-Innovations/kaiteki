package org.kaiteki.backend.integrations.modules.telegram.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TelegramLinkDTO {
    private String link;
}
