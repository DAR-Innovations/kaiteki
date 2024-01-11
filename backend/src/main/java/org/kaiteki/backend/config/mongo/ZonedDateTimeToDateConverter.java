package org.kaiteki.backend.config.mongo;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;

import java.time.ZonedDateTime;
import java.util.Date;

@WritingConverter
public enum ZonedDateTimeToDateConverter implements Converter<ZonedDateTime, Date> {
    INSTANCE;

    @Override
    public Date convert(ZonedDateTime source) {
        return Date.from(source.toInstant());
    }
}

