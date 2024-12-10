package com.example.login.repository;

import com.example.login.entity.Enseignant;
import com.example.login.entity.Local;
import com.example.login.entity.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SurveillanceRepository extends JpaRepository<Surveillance, Long> {
    List<Surveillance> findByDate(LocalDate date);
    List<Surveillance> findByEnseignant(Enseignant enseignant);
    List<Surveillance> findByLocal(Local local);
    int countByEnseignantAndDate(Enseignant enseignant, LocalDate date);
    int countByEnseignantAndRole(Enseignant enseignant, Surveillance.Role role);
}
