package org.kaiteki.backend.integrations.modules.zoom.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.CreateZoomMeetingDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.CreateZoomSignatureDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.ZoomMeetingDTO;
import org.kaiteki.backend.integrations.modules.zoom.models.dto.ZoomSignatureDTO;
import org.kaiteki.backend.integrations.modules.zoom.services.ZoomService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/integrations/zoom")
public class ZoomController {
//    private final ZoomService zoomService;
//
//    @PostMapping("/signature")
//    public ZoomSignatureDTO getSignature(@RequestBody CreateZoomSignatureDTO dto) {
//        return zoomService.generateMeetingSignature(dto);
//    }
//
//    @PostMapping("/")
//    public ZoomMeetingDTO createMeetingDTO(@RequestBody CreateZoomMeetingDTO dto) {
//        return zoomService.createZoomMeeting(dto);
//    }
//
//    @GetMapping("/{id}")
//    public ZoomMeetingDTO createMeetingDTO(@PathVariable Long id) {
//        return zoomService.getZoomMeetingById(id);
//    }
}