package com.example.login.service;

import com.example.login.entity.*;
import com.example.login.repository.SurveillanceRepository;
import com.example.login.repository.EnseignantRepository;
import com.example.login.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class SurveillanceService {

    @Autowired
    private SurveillanceRepository surveillanceRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private ExamRepository examRepository;

    public List<Surveillance> createSurveillancesForExam(Exam exam) {
        List<Surveillance> surveillances = generateSurveillances(exam);
        return surveillanceRepository.saveAll(surveillances);
    }

    public List<Surveillance> generateSurveillances(Exam exam) {
        List<Surveillance> surveillances = new ArrayList<>();
        Surveillance.TimeSlot timeSlot = determineTimeSlot(exam.getStartTime());
        int requiredSupervisors = calculateRequiredSupervisors(exam.getNombreDesEtudiants());

        // Assign module instructor first (TT)
        assignInstructorSurveillance(surveillances, exam, timeSlot);

        // Assign additional supervisors
        assignAdditionalSupervisors(surveillances, exam, timeSlot, requiredSupervisors - 1);

        // Assign reservists (RR)
        assignReservists(surveillances, exam, timeSlot);

        return surveillances;
    }

    private void assignInstructorSurveillance(List<Surveillance> surveillances, Exam exam, Surveillance.TimeSlot timeSlot) {
        if (isTeacherAvailable(exam.getInstructor(), exam.getExamDate())) {
            Surveillance instructorSurveillance = new Surveillance(
                    exam.getInstructor(),
                    exam.getLocal(),
                    exam.getSession(),
                    Surveillance.Role.SURVEILLANT,
                    exam.getExamDate(),
                    timeSlot
            );
            surveillances.add(instructorSurveillance);
        }
    }

    private void assignAdditionalSupervisors(List<Surveillance> surveillances, Exam exam,
                                             Surveillance.TimeSlot timeSlot, int count) {
        List<Enseignant> availableTeachers = findAvailableTeachers(exam.getExamDate(), timeSlot);
        availableTeachers.remove(exam.getInstructor());

        for (int i = 0; i < count && !availableTeachers.isEmpty(); i++) {
            Enseignant supervisor = selectSupervisor(availableTeachers, exam.getExamDate());
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
    }

    private void assignReservists(List<Surveillance> surveillances, Exam exam,
                                  Surveillance.TimeSlot timeSlot) {
        List<Enseignant> availableTeachers = findAvailableTeachers(exam.getExamDate(), timeSlot);
        availableTeachers.removeAll(surveillances.stream()
                .map(Surveillance::getEnseignant)
                .collect(Collectors.toList()));

        int reservistsNeeded = 10 - surveillances.size();
        for (int i = 0; i < reservistsNeeded && !availableTeachers.isEmpty(); i++) {
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
    }

    public List<Surveillance> getSurveillancesByDate(LocalDate date) {
        return surveillanceRepository.findByDate(date);
    }

    public List<Surveillance> getSurveillancesByEnseignant(Enseignant enseignant) {
        return surveillanceRepository.findByEnseignant(enseignant);
    }

    public List<Surveillance> getSurveillancesByLocal(Local local) {
        return surveillanceRepository.findByLocal(local);
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
        return enseignantRepository.findAll().stream()
                .filter(teacher -> isTeacherAvailable(teacher, date))
                .collect(Collectors.toList());
    }

    private boolean isTeacherAvailable(Enseignant teacher, LocalDate date) {
        int dailySurveillances = surveillanceRepository.countByEnseignantAndDate(teacher, date);
        return dailySurveillances < 2;
    }

    private Enseignant selectSupervisor(List<Enseignant> availableTeachers, LocalDate date) {
        return availableTeachers.stream()
                .min(Comparator.comparingInt(teacher ->
                        surveillanceRepository.countByEnseignantAndRole(teacher, Surveillance.Role.SURVEILLANT)))
                .orElse(null);
    }

    private Enseignant selectReservist(List<Enseignant> availableTeachers, LocalDate date) {
        return availableTeachers.stream()
                .min(Comparator.comparingInt(teacher ->
                        surveillanceRepository.countByEnseignantAndRole(teacher, Surveillance.Role.RESERVISTE)))
                .orElse(null);
    }

    public boolean deleteSurveillance(Long id) {
        if (surveillanceRepository.existsById(id)) {
            surveillanceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Surveillance updateSurveillance(Long id, Surveillance updatedSurveillance) {
        return surveillanceRepository.findById(id)
                .map(surveillance -> {
                    surveillance.setEnseignant(updatedSurveillance.getEnseignant());
                    surveillance.setLocal(updatedSurveillance.getLocal());
                    surveillance.setSession(updatedSurveillance.getSession());
                    surveillance.setRole(updatedSurveillance.getRole());
                    surveillance.setDate(updatedSurveillance.getDate());
                    surveillance.setTimeSlot(updatedSurveillance.getTimeSlot());
                    return surveillanceRepository.save(surveillance);
                })
                .orElse(null);
    }
}