package org.kaiteki.backend.shared.utils;

import java.time.*;
import java.util.Calendar;
import java.util.Date;

public final class DateFormattingUtil {
    public static Date setTimeToEndOfDay(Date date) {
        if(date == null) return null;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 24);
        return cal.getTime();
    }

    public static ZonedDateTime setTimeToStartOfDay(ZonedDateTime zonedDateTime) {
        if (zonedDateTime == null) {
            return null;
        }

        return zonedDateTime.with(LocalTime.MIN);
    }

    public static ZonedDateTime setTimeToEndOfDay(ZonedDateTime zonedDateTime) {
        if (zonedDateTime == null) {
            return null;
        }

        return zonedDateTime.with(LocalTime.MAX);
    }

    public static LocalDate convertZonedDateTimeToLocalDate(ZonedDateTime dateTime) {
        return dateTime.withZoneSameInstant(ZoneId.of("UTC")).toLocalDate();
    }
}
