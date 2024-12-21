package com.example.login.service;

import com.example.login.entity.*;
import com.example.login.repository.SessionRepository;
import com.example.login.repository.SurveillanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class SurveillanceService {

    @Autowired
    private EnseignantService enseignantService;

    @Autowired
    private LocalService localService;

    @Autowired
    private ExamService examService;

    @Autowired
    private SessionRepository sessionRepository;

    public Map<String, Map<String, String>> generateSurveillanceTable(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        List<Exam> exams = examService.getExamsBySession(sessionId);
        List<Enseignant> enseignants = enseignantService.getAllEnseignants();
        Map<Long, Integer> professorAssignments = new HashMap<>();
        Map<String, Map<String, String>> surveillanceTable = new HashMap<>();

        // Initialize table and assignments
        for (Enseignant enseignant : enseignants) {
            surveillanceTable.put(String.valueOf(enseignant.getId()), new HashMap<>());
            professorAssignments.put(enseignant.getId(), 0);
        }

        // Process each exam
        for (Exam exam : exams) {
            assignTournant(surveillanceTable, professorAssignments, exam);
            assignSurveillants(surveillanceTable, professorAssignments, exam);
        }

        // Assign reservists based on session
        assignReservists(surveillanceTable, enseignants, professorAssignments, session);

        return surveillanceTable;
    }

    private void assignTournant(Map<String, Map<String, String>> table, Map<Long, Integer> assignments, Exam exam) {
        Enseignant tournant = exam.getInstructor();
        String idKey = String.valueOf(tournant.getId());
        table.get(idKey).put(getSessionKey(exam), "TT");
        assignments.put(tournant.getId(), assignments.getOrDefault(tournant.getId(), 0) + 1);
    }

    private void assignSurveillants(Map<String, Map<String, String>> table, Map<Long, Integer> assignments, Exam exam) {
        Local local = exam.getLocal();
        if (local == null) {
            throw new IllegalArgumentException("Exam " + exam.getId() + " does not have a local assigned");
        }

        int requiredSurveillants = calculateRequiredSurveillants(local.getTaille());
        assignToLocale(table, assignments, exam, local, requiredSurveillants);
    }

    private void assignToLocale(Map<String, Map<String, String>> table, Map<Long, Integer> assignments, Exam exam,
                                Local local, int requiredSurveillants) {
        int assignedCount = 0;

        for (String professorId : table.keySet()) {
            Long id = Long.valueOf(professorId);
            if (assignedCount >= requiredSurveillants) break;
            if (assignments.getOrDefault(id, 0) >= 1) continue; // Max 1 session per day

            table.get(professorId).put(getSessionKey(exam), local.getNom());
            assignments.put(id, assignments.getOrDefault(id, 0) + 1);
            assignedCount++;
        }
    }

    private void assignReservists(Map<String, Map<String, String>> table, List<Enseignant> enseignants,
                                  Map<Long, Integer> assignments, Session session) {
        LocalDate currentDate = session.getStartDate();

        // Iterate over each day in the session
        while (!currentDate.isAfter(session.getEndDate())) {
            assignReservistsForHalfDay(
                    table, enseignants, assignments, currentDate,
                    session.getExam1Start() + "-" + session.getExam2End(), "Morning"
            );

            assignReservistsForHalfDay(
                    table, enseignants, assignments, currentDate,
                    session.getExam3Start() + "-" + session.getExam4End(), "Afternoon"
            );

            currentDate = currentDate.plusDays(1);
        }
    }

    private void assignReservistsForHalfDay(Map<String, Map<String, String>> table, List<Enseignant> enseignants,
                                            Map<Long, Integer> assignments, LocalDate date, String timeRange, String halfDay) {
        int reservistCount = 0;

        for (Enseignant enseignant : enseignants) {
            if (reservistCount >= 10) break; // Stop after assigning 10 reservists

            String idKey = String.valueOf(enseignant.getId());
            String sessionKey = date + " " + halfDay + " (" + timeRange + ")";
            if (assignments.getOrDefault(enseignant.getId(), 0) >= 1) continue;

            table.get(idKey).put(sessionKey, "RR");
            assignments.put(enseignant.getId(), assignments.getOrDefault(enseignant.getId(), 0) + 1);
            reservistCount++;
        }
    }

    private int calculateRequiredSurveillants(int roomCapacity) {
        if (roomCapacity >= 80) return 4;
        if (roomCapacity >= 65) return 3;
        return 2;
    }

    private String getSessionKey(Exam exam) {
        return exam.getExamDate() + " " + exam.getStartTime() + "-" + exam.getEndTime();
    }
}

