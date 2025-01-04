package com.example.login.repository;

import com.example.login.entity.Session;
import com.example.login.entity.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

public interface SurveillanceRepository extends JpaRepository<Surveillance, Long> {

    @Query("SELECT s FROM Surveillance s WHERE s.date = :date AND s.timeSlot = :timeSlot")
    List<Surveillance> findByDateAndTimeSlot(@Param("date") LocalDate date, @Param("timeSlot") String timeSlot);

    @Query("SELECT COUNT(s) FROM Surveillance s WHERE s.enseignant.id = :enseignantId AND s.date = :date")
    long countByEnseignantAndDate(@Param("enseignantId") Long enseignantId, @Param("date") LocalDate date);

    @Query("SELECT s FROM Surveillance s WHERE s.exam.session.id = :sessionId")
    List<Surveillance> findBySessionId(@Param("sessionId") Long sessionId);
}