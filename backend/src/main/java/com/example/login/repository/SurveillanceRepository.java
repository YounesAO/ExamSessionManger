package com.example.login.repository;

import com.example.login.entity.Session;
import com.example.login.entity.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveillanceRepository extends JpaRepository<Surveillance, Long> {
    List<Surveillance> findBySession(Session session);
    void deleteBySession(Session session);
}
