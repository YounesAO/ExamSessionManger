package com.example.login.repository;

import com.example.login.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    // Custom query method to find exams by option ID
    List<Exam> findByOptionId(Long optionId);

    // Find exams by instructor ID
    List<Exam> findByInstructorId(Long instructorId);
}
