package com.ensa.session.repository;

import com.ensa.session.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnseignantRepository extends JpaRepository <Enseignant, Long> {
    // Find by email (unique constraint)
    Enseignant findByEmail(String email);
}

