package com.example.login.controller;

import com.example.login.Dto.SurveillanceDTO;
import com.example.login.service.SurveillanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveillances")
public class SurveillanceController {

    private final SurveillanceService surveillanceService;

    public SurveillanceController(SurveillanceService surveillanceService) {
        this.surveillanceService = surveillanceService;
    }

    /**
     * Endpoint to get surveillance assignments for a specific session.
     *
     * @param sessionId The ID of the session
     * @return A list of SurveillanceDTO objects
     */
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<SurveillanceDTO>> getSurveillancesForSession(@PathVariable Long sessionId) {
        List<SurveillanceDTO> surveillances = surveillanceService.assignSurveillanceForSession(sessionId);
        return ResponseEntity.ok(surveillances);
    }
    @GetMapping("/getData/idsession/{sessionId}")
    public ResponseEntity<List<SurveillanceDTO>> getSurveillanceDataBySession(@PathVariable Long sessionId) {
        List<SurveillanceDTO> surveillances = surveillanceService.getSurveillanceDataForSession(sessionId);
        return ResponseEntity.ok(surveillances);
    }
}