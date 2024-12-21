package com.example.login.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SurveillanceDTO {

    private Long id; // Surveillance ID
    private String enseignantName; // Full name of the enseignant
    private String examName; // Name of the exam
    private String examDate; // Date of the exam (formatted as yyyy-MM-dd)
    private String timeSlot; // "Matin" or "Après-midi"
    private boolean isReservist; // True if the enseignant is a reservist
    private String localName; // Name of the exam location (e.g., Amphi A, Salle 1)
    private int nombreDesEtudiants; // Number of students in the exam
}