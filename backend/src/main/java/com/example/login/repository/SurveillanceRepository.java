package com.example.login.repository;

import com.example.login.entity.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SurveillanceRepository extends JpaRepository<Surveillance, Long> {
    @Query("SELECT s FROM Surveillance s WHERE s.date = :date AND s.timeSlot = :timeSlot")
    List<Surveillance> findByDateAndTimeSlot(@Param("date") LocalDate date, @Param("timeSlot") String timeSlot);
}
