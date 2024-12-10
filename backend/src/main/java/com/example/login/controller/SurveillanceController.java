package com.example.login.controller;

import com.example.login.entity.*;
import com.example.login.repository.EnseignantRepository;
import com.example.login.repository.SurveillanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Controller
public class SurveillanceController {

    @Autowired
    private SurveillanceRepository surveillanceRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    public List<Surveillance> generateSurveillances(Exam exam) {
        List<Surveillance> surveillances = new ArrayList<>();

        // Determine number of supervisors needed based on student count
        int numberOfSupervisors = calculateRequiredSupervisors(exam.getNombreDesEtudiants());

        // Get available teachers for the time slot
        Surveillance.TimeSlot timeSlot = determineTimeSlot(exam.getStartTime());
        List<Enseignant> availableTeachers = findAvailableTeachers(exam.getExamDate(), timeSlot);

        // First, assign the module instructor (TT)
        Surveillance instructorSurveillance = new Surveillance(
                exam.getInstructor(),
                exam.getLocal(),
                exam.getSession(),
                Surveillance.Role.SURVEILLANT,
                exam.getExamDate(),
                timeSlot
        );
        surveillances.add(instructorSurveillance);

        // Remove instructor from available teachers
        availableTeachers.remove(exam.getInstructor());

        // Select additional supervisors
        for (int i = 1; i < numberOfSupervisors; i++) {
            Enseignant supervisor = selectSupervisor(availableTeachers, exam.getExamDate(), timeSlot);
            if (supervisor != null) {
                Surveillance supervision = new Surveillance(
                        supervisor,
                        exam.getLocal(),
                        exam.getSession(),
                        Surveillance.Role.SURVEILLANT,
                        exam.getExamDate(),
                        timeSlot
                );
                surveillances.add(supervision);
                availableTeachers.remove(supervisor);
            }
        }

        // Select reserve teachers (RR)
        int reservistsNeeded = 10 - surveillances.size(); // Ensure total of 10 teachers per time slot
        for (int i = 0; i < reservistsNeeded; i++) {
            Enseignant reservist = selectReservist(availableTeachers, exam.getExamDate());
            if (reservist != null) {
                Surveillance reserve = new Surveillance(
                        reservist,
                        exam.getLocal(),
                        exam.getSession(),
                        Surveillance.Role.RESERVISTE,
                        exam.getExamDate(),
                        timeSlot
                );
                surveillances.add(reserve);
                availableTeachers.remove(reservist);
            }
        }

        return surveillances;
    }

    private int calculateRequiredSupervisors(int studentCount) {
        if (studentCount >= 80) return 4;
        if (studentCount >= 65) return 3;
        return 2;
    }

    private Surveillance.TimeSlot determineTimeSlot(LocalTime startTime) {
        return startTime.isBefore(LocalTime.NOON) ?
                Surveillance.TimeSlot.MORNING :
                Surveillance.TimeSlot.AFTERNOON;
    }

    private List<Enseignant> findAvailableTeachers(LocalDate date, Surveillance.TimeSlot timeSlot) {
        // Get all teachers who haven't reached their daily surveillance limit
        return enseignantRepository.findAll().stream()
                .filter(teacher -> countDailySurveillances(teacher, date) < 2)
                .collect(Collectors.toList());
    }

    private int countDailySurveillances(Enseignant teacher, LocalDate date) {
        return surveillanceRepository.countByEnseignantAndDate(teacher, date);
    }

    private Enseignant selectSupervisor(List<Enseignant> availableTeachers, LocalDate date, Surveillance.TimeSlot timeSlot) {
        // Select teacher with least number of surveillances to maintain equity
        return availableTeachers.stream()
                .min(Comparator.comparingInt(teacher ->
                        surveillanceRepository.countByEnseignantAndRole(teacher, Surveillance.Role.SURVEILLANT)))
                .orElse(null);
    }

    private Enseignant selectReservist(List<Enseignant> availableTeachers, LocalDate date) {
        // Select teacher who has been reservist the least number of times
        return availableTeachers.stream()
                .min(Comparator.comparingInt(teacher ->
                        surveillanceRepository.countByEnseignantAndRole(teacher, Surveillance.Role.RESERVISTE)))
                .orElse(null);
    }
}