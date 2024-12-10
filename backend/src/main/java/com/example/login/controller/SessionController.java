package com.example.login.controller;


import com.example.login.entity.Session;
import com.example.login.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    // Add a new session
    @PostMapping
    public ResponseEntity<Session> addSession(@RequestBody Session session) {
        Session newSession = sessionService.addSession(session);
        return ResponseEntity.ok(newSession);
    }

    // Get all sessions
    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return ResponseEntity.ok(sessions);
    }

    // Get a session by ID
    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        Session session = sessionService.getSessionById(id);
        return ResponseEntity.ok(session);
    }

    @GetMapping("/type/{sessionType}")
    public ResponseEntity<Session> getSessionByType(@PathVariable String sessionType) {
        Session session = sessionService.getSessionByType(sessionType);
        return ResponseEntity.ok(session);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getSessionCount() {
        long count = sessionService.getSessionCount();
        return ResponseEntity.ok(count);
    }


    // Update a session
    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody Session updatedSession) {
        Session session = sessionService.updateSession(id, updatedSession);
        return ResponseEntity.ok(session);
    }

    // Delete a session
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return ResponseEntity.ok("Session deleted successfully.");
    }

    @GetMapping("/{id}/schedule")
    public ResponseEntity<Map<String, Object>> getSessionSchedule(@PathVariable Long id) {
        try {
            // Use the sessionService to fetch the session by ID
            Session session = sessionService.getSessionById(id);

            List<Map<String, String>> timeSlots = new ArrayList<>();
            timeSlots.add(Map.of(
                    "id", "1",
                    "time", formatTimeRange(session.getExam1Start(),session.getExam1End()) // Example end time
            ));
            timeSlots.add(Map.of(
                    "id", "2",
                    "time", formatTimeRange(session.getExam2Start(), session.getExam2End()) // Calculate dynamically
            ));
            timeSlots.add(Map.of(
                    "id", "3",
                    "time", formatTimeRange(session.getExam3Start(), session.getExam3End())
            ));
            timeSlots.add(Map.of(
                    "id", "4",
                    "time", formatTimeRange(session.getExam4Start(), session.getExam4End())
            ));

            // Define the formatter for the desired display format
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE dd MMM", Locale.FRENCH);

            List<Map<String, String>> examDays = new ArrayList<>();

            LocalDate currentDay = session.getStartDate();

            // Loop until currentDay is after endDate
            while (!currentDay.isAfter(session.getEndDate())) {
                examDays.add(Map.of(
                        "date", currentDay.toString(),
                        "display", currentDay.format(formatter) // Format the date
                ));
                currentDay = currentDay.plusDays(1); // Increment to the next day
            }

            Map<String, Object> schedule = new HashMap<>();
            schedule.put("timeSlots", timeSlots);
            schedule.put("examDays", examDays);

            return ResponseEntity.ok(schedule);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Session not found"));
        }
    }
    private static String formatTimeRange(LocalTime start, LocalTime end) {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm"); // Format for time display

        return start.format(timeFormatter) + "-" + end.format(timeFormatter);
    }
}


