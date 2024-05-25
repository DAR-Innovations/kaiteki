package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class ZoomMeetingRecurrenceDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private Integer type;
    private Integer repeat_interval;
    private String weekly_days;
    private Integer monthly_day;
    private Integer monthly_week;
    private Integer monthly_week_day;
    private Integer end_times;
    private String end_date_time;
}