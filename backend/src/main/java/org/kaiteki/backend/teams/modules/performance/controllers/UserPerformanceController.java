package org.kaiteki.backend.teams.modules.performance.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.performance.models.dto.UserPerformanceDTO;
import org.kaiteki.backend.teams.modules.performance.services.UserPerformanceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/performance/users")
@RequiredArgsConstructor
public class UserPerformanceController {
    private final UserPerformanceService userPerformanceService;

    @GetMapping()
    public UserPerformanceDTO getLatestUserPerformance() {
        return userPerformanceService.getLatestUserPerformance();
    }

}
