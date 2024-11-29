package com.ensa.session.repository;

import com.ensa.session.model.Local;
import com.ensa.session.model.LocalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
    // Find locals by type
    List<Local> findByType(LocalType type);
}