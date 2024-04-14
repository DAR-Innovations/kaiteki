package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class ZoomInterpreterDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public String email;
    public String languages;
}
