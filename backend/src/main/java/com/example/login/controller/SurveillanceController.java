package com.example.login.controller;

import com.example.login.Dto.SurveillanceDTO;
import com.example.login.service.SurveillanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveillances")
public class SurveillanceController {
    private final SurveillanceService surveillanceService;

    public SurveillanceController(SurveillanceService surveillanceService) {
        this.surveillanceService = surveillanceService;
    }

    @GetMapping
    public List<SurveillanceDTO> getSurveillances(@RequestParam Long departmentId, @RequestParam String date) {
        // Logic to filter surveillances by department and date
        return surveillanceService.getSurveillances(departmentId, date);
    }
}
