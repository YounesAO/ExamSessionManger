package com.example.login.repository;


import com.example.login.entity.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartementRepository extends JpaRepository<Departement, Long> {

    // Custom query method to find a department by name
    Optional<Departement> findByName(String name);

    boolean existsById(Long id);
}

