package com.ensa.session.repository;

import com.ensa.session.model.Departement;
import com.ensa.session.model.Enseignant;
import com.ensa.session.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    // Find exams by department
    List<Exam> findByDepartement(Departement departement);

    // Find exams by responsible teacher
    List<Exam> findByEnseignantResponsable(Enseignant enseignant);
}