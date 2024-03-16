package org.kaiteki.backend.files.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.files.model.dto.*;
import org.kaiteki.backend.files.service.TeamFilesService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/v1/team-files")
@RequiredArgsConstructor
public class TeamFilesController {
    private final TeamFilesService teamFilesService;

    @PostMapping
    public void uploadFile(@RequestParam Long teamId, @ModelAttribute UploadTeamFileDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        teamFilesService.uploadFile(teamId, dto);
    }

    @GetMapping
    public Page<TeamFilesDTO> getTeamFiles(@RequestParam Long teamId,
                                           @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,
                                           TeamFilesFilter filter) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        return teamFilesService.getTeamFilesDTO(teamId, filter, pageable);
    }

    @DeleteMapping("/{id}")
    public void deleteTeamFile(@RequestParam Long teamId, @PathVariable Long id) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        teamFilesService.deleteTeamFile(teamId, id);
    }

    @PutMapping("/{id}")
    public void updateTeamFile(@RequestParam Long teamId,
                               @PathVariable Long id,
                               @RequestBody UpdateTeamFileDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        teamFilesService.updateTeamFile(teamId, id, dto);
    }
}
