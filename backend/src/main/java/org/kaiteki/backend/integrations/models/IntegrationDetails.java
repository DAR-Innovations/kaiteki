package org.kaiteki.backend.integrations.models;

import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IntegrationDetails {
    private ZonedDateTime enabledDate;
    private ZonedDateTime disabledDate;
    private Boolean enabled;
}
