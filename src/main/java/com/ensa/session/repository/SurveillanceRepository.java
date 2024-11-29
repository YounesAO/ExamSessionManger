package com.ensa.session.repository;

import com.ensa.session.model.Enseignant;
import com.ensa.session.model.Exam;
import com.ensa.session.model.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveillanceRepository extends JpaRepository<Surveillance, Long> {
    // Find surveillances by exam
    List<Surveillance> findByExam(Exam exam);

    // Find surveillances by teacher
    List<Surveillance> findByEnseignant(Enseignant enseignant);
}