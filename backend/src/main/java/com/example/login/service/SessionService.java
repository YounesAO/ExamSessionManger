package com.example.login.service;


import com.example.login.entity.Session;
import com.example.login.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }


    public Session addSession(Session session) {
        return sessionRepository.save(session);
    }

    // Get all sessions
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public long getSessionCount() {
        return sessionRepository.count();
    }


    // Get a session by ID
    public Session getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found with ID: " + id));
    }

    public Session getSessionByType(String sessionType) {
        return sessionRepository.findBySessionType(sessionType)
                .orElseThrow(() -> new RuntimeException("Session not found with type: " + sessionType));
    }


    public Session updateSession(Long id, Session updatedSession) {
        Session existingSession = getSessionById(id); // Retrieve the session
        existingSession.setSessionType(updatedSession.getSessionType());
        existingSession.setStartDate(updatedSession.getStartDate());
        existingSession.setEndDate(updatedSession.getEndDate());
        existingSession.setExam1Start(updatedSession.getExam1Start());
        existingSession.setExam1End(updatedSession.getExam1End());
        existingSession.setExam2Start(updatedSession.getExam2Start());
        existingSession.setExam2End(updatedSession.getExam2End());
        existingSession.setExam3Start(updatedSession.getExam3Start());
        existingSession.setExam3End(updatedSession.getExam3End());
        existingSession.setExam4Start(updatedSession.getExam4Start());
        existingSession.setExam4End(updatedSession.getExam4End());
        return sessionRepository.save(existingSession);
    }

    // Delete a session by ID
    public void deleteSession(Long id) {
        Session session = getSessionById(id); // Ensure the session exists
        sessionRepository.delete(session);
    }
}
