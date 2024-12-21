package com.example.login.service;

import com.example.login.entity.Exam;
import com.example.login.entity.Session;
import com.example.login.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExamService {

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    // Add a new exam
    public Exam addExam(Exam exam) {
        return examRepository.save(exam);
    }

    // Get all exams
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Get an exam by ID
    public Exam getExamById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found with ID: " + id));
    }
    public List<Exam> getExamsBySession(Long sessionId) {
        return examRepository.findBySessionId(sessionId);
}
    // Get exams by option (filière)
    public List<Exam> getExamsByOption(Long optionId) {
        return examRepository.findByOptionId(optionId);
    }
    public long getExamCount() {
        return examRepository.count();
    }
    // Get exams by instructor (Enseignant)
    public List<Exam> getExamsByInstructor(Long instructorId) {
        return examRepository.findByInstructorId(instructorId);
    }


    // Update an exam
    public Exam updateExam(Long id, Exam updatedExam) {
        Exam existingExam = getExamById(id);
        existingExam.setName(updatedExam.getName());
        existingExam.setExamDate(updatedExam.getExamDate());
        existingExam.setStartTime(updatedExam.getStartTime());
        existingExam.setEndTime(updatedExam.getEndTime());
        existingExam.setSession(updatedExam.getSession());
        existingExam.setLocal(updatedExam.getLocal());
        existingExam.setModule(updatedExam.getModule());
        existingExam.setOption(updatedExam.getOption());
        existingExam.setInstructor(updatedExam.getInstructor());
        return examRepository.save(existingExam);
    }

    // Delete an exam
    public void deleteExam(Long id) {
        Exam exam = getExamById(id);
        examRepository.delete(exam);
    }


}
