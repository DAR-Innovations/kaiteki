package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class ZoomGlobalDialInNumbersDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String country;
    private String country_name;
    private String city;
    private String number;
    private String type;
}
