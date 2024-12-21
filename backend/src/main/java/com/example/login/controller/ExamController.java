package com.example.login.controller;

import com.example.login.Dto.ExamDTO;
import com.example.login.entity.*;
import com.example.login.service.ExamService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @PersistenceContext
    private EntityManager entityManager;

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    // Add a new exam
    @PostMapping
    public ResponseEntity<com.example.login.Dto.ExamDTO> addExam(@RequestBody ExamDTO examDTO) {
        Exam exam = new Exam();
        exam.setName(examDTO.getName());
        exam.setNombreDesEtudiants(examDTO.getNombreDesEtudiants());
        exam.setExamDate(LocalDate.parse(examDTO.getExamDate()));
        exam.setStartTime(LocalTime.parse(examDTO.getStartTime()));
        exam.setEndTime(LocalTime.parse(examDTO.getEndTime()));

        exam.setSession(entityManager.getReference(Session.class, examDTO.getSessionId()));
        exam.setLocal(entityManager.getReference(Local.class, examDTO.getLocalId()));
        exam.setModule(entityManager.getReference(ModuleEntity.class, examDTO.getModuleId()));
        exam.setOption(entityManager.getReference(Option.class, examDTO.getOptionId()));
        exam.setInstructor(entityManager.getReference(Enseignant.class, examDTO.getInstructorId()));

        Exam savedExam = examService.addExam(exam);
        return ResponseEntity.ok(new ExamDTO(savedExam)); // Map the saved Exam to ExamDTO
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getExamCount() {
        return ResponseEntity.ok(examService.getExamCount());
    }

    // Get all exams
    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    // Get an exam by ID
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        Exam exam = examService.getExamById(id);
        return ResponseEntity.ok(exam);
    }

    // Get exams by option (filière)
    @GetMapping("/option/{optionId}")
    public ResponseEntity<List<Exam>> getExamsByOption(@PathVariable Long optionId) {
        List<Exam> exams = examService.getExamsByOption(optionId);
        return ResponseEntity.ok(exams);
    }

    // Get exams by instructor (Enseignant)
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Exam>> getExamsByInstructor(@PathVariable Long instructorId) {
        List<Exam> exams = examService.getExamsByInstructor(instructorId);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/bySession/{sessionId}")
    public ResponseEntity<List<Exam>> getExamsBySessionId(@PathVariable Long sessionId) {
        List<Exam> exams = examService.getExamsBySession(sessionId);
        if (exams.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(exams, HttpStatus.OK);
}
    // Update an exam
    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam updatedExam) {
        Exam exam = examService.updateExam(id, updatedExam);
        return ResponseEntity.ok(exam);
    }



    // Delete an exam
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.ok("Exam deleted successfully.");
    }
}
