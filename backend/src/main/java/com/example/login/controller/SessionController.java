package com.example.login.controller;


import com.example.login.entity.Session;
import com.example.login.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}

