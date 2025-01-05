package com.example.login.service;

import com.example.login.Dto.SurveillanceDTO;
import com.example.login.entity.Enseignant;
import com.example.login.entity.Exam;
import com.example.login.entity.Surveillance;
import com.example.login.repository.EnseignantRepository;
import com.example.login.repository.ExamRepository;
import com.example.login.repository.SurveillanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SurveillanceService {

    @Autowired
    private SurveillanceRepository surveillanceRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private ExamRepository examRepository;

    public List<SurveillanceDTO> assignSurveillanceForSession(Long sessionId) {
        // Fetch all exams for the given session
        List<Exam> exams = examRepository.findBySessionId(sessionId);

        List<SurveillanceDTO> surveillances = new ArrayList<>();

        for (Exam exam : exams) {
            // Fetch the persistent Exam entity
            Exam persistentExam = examRepository.findById(exam.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Exam not found with ID: " + exam.getId()));

            // Fetch all professors (enseignants)
            List<Enseignant> enseignants = enseignantRepository.findAll();

            // Assign TT (Tournant) - Instructor for the exam
            Enseignant instructor = persistentExam.getInstructor();
            surveillances.add(assignTournant(instructor, persistentExam));

            // Assign regular surveillants
            String timeSlot = formatTimeSlot(persistentExam.getStartTime());
            List<Enseignant> surveillants = enseignants.stream()
                    .filter(e -> canAssign(e, persistentExam.getExamDate(), timeSlot))
                    .limit(getRequiredSurveillants(persistentExam))
                    .collect(Collectors.toList());

            for (Enseignant surveillant : surveillants) {
                surveillances.add(assignSurveillant(surveillant, persistentExam));
            }

            // Assign reservists (RR)
            assignReservists(enseignants, persistentExam.getExamDate(), timeSlot, surveillances, persistentExam);
        }

        return surveillances;
    }

    private SurveillanceDTO assignTournant(Enseignant instructor, Exam exam) {
        Surveillance surveillance = new Surveillance();
        surveillance.setEnseignant(instructor);
        surveillance.setExam(exam); // Use the persistent Exam
        surveillance.setDate(exam.getExamDate());
        surveillance.setSession(exam.getSession());
        surveillance.setTimeSlot("TT"); // Tournant role
        surveillance.setReservist(false);
        surveillance.setRole("TT"); // Set role explicitly
        surveillanceRepository.save(surveillance);

        return mapToDTO(surveillance);
    }

    private SurveillanceDTO assignSurveillant(Enseignant enseignant, Exam exam) {
        Surveillance surveillance = new Surveillance();
        surveillance.setEnseignant(enseignant);
        surveillance.setExam(exam); // Use the persistent Exam
        surveillance.setDate(exam.getExamDate());
        surveillance.setSession(exam.getSession());
        surveillance.setTimeSlot(exam.getLocal().getNom()); // Show Local Name in Time Slot
        surveillance.setReservist(false);
        surveillance.setRole(exam.getLocal().getNom()); // Set role explicitly (local name)
        surveillanceRepository.save(surveillance);

        return mapToDTO(surveillance);
    }

    private void assignReservists(List<Enseignant> enseignants, LocalDate date, String timeSlot, List<SurveillanceDTO> surveillances, Exam exam) {
        List<Enseignant> reservists = enseignants.stream()
                .filter(e -> !isAlreadyReservist(e, date, timeSlot))
                .limit(10)
                .collect(Collectors.toList());

        for (Enseignant reservist : reservists) {
            Surveillance surveillance = new Surveillance();
            surveillance.setEnseignant(reservist);
            surveillance.setExam(exam); // Use the persistent Exam
            surveillance.setDate(date);
            surveillance.setSession(exam.getSession());
            surveillance.setTimeSlot("RR"); // Reservist role
            surveillance.setReservist(true);
            surveillance.setRole("RR"); // Set role explicitly (Reservist)
            surveillanceRepository.save(surveillance);

            surveillances.add(mapToDTO(surveillance));
        }
    }

    private boolean canAssign(Enseignant enseignant, LocalDate date, String timeSlot) {
        long count = surveillanceRepository.countByEnseignantAndDate(enseignant.getId(), date);
        return count < 2 && !isAlreadyReservist(enseignant, date, timeSlot);
    }

    private boolean isAlreadyReservist(Enseignant enseignant, LocalDate date, String timeSlot) {
        List<Surveillance> reservists = surveillanceRepository.findByDateAndTimeSlot(date, timeSlot);
        return reservists.stream()
                .anyMatch(s -> s.getEnseignant().getId().equals(enseignant.getId()) && s.isReservist());
    }

    private int getRequiredSurveillants(Exam exam) {
        int students = exam.getNombreDesEtudiants();
        if (students > 80) return 4;
        if (students > 65) return 3;
        return 2;
    }

    private SurveillanceDTO mapToDTO(Surveillance surveillance) {
        SurveillanceDTO dto = new SurveillanceDTO();
        dto.setId(surveillance.getId());
        dto.setEnseignantId(surveillance.getEnseignant().getId()); // Set enseignantId
        dto.setEnseignantName(surveillance.getEnseignant().getFirstName() + " " + surveillance.getEnseignant().getLastName());
        dto.setExamName(surveillance.getExam().getName());
        dto.setExamDate(surveillance.getDate().toString());
        dto.setTimeSlot(surveillance.getExam().getStartTime().toString() + "-" + surveillance.getExam().getEndTime().toString()); // Time of the exam
        dto.setRole(surveillance.getRole()); // Set role
        dto.setLocalName(surveillance.getExam().getLocal().getNom());
        dto.setNombreDesEtudiants(surveillance.getExam().getNombreDesEtudiants());
        dto.setReservist(surveillance.isReservist());
        return dto;
    }

    private String formatTimeSlot(LocalTime startTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return startTime.format(formatter);
    }

    public List<SurveillanceDTO> getSurveillanceDataForSession(Long sessionId) {
        List<Surveillance> surveillances = surveillanceRepository.findBySessionId(sessionId);
        return surveillances.stream().map(this::mapToDTO).collect(Collectors.toList());
    }
}
