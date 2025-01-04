package com.example.login.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Surveillance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "enseignant_id", nullable = false)
    private Enseignant enseignant;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(nullable = false)
    private LocalDate date; // Ensure this is LocalDate

    @Column(nullable = false)
    private String timeSlot; // Ensure this is String ("Matin" or "Après-midi")

    @Column(nullable = false)
    private boolean isReservist;
    @Column(nullable = false)
    private String role;
    // Getters and setters
}