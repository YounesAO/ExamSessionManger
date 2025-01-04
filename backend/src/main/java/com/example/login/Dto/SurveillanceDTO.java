package com.example.login.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SurveillanceDTO {
    private Long id; // ID of the surveillance record
    private String enseignantName; // Full name of the professor
    private String examName; // Name of the exam
    private String examDate; // Date of the exam (yyyy-MM-dd)
    private String timeSlot; // Time slot (e.g., 08:00-10:00) or local name
    private String role; // TT, RR, or Surveillant
    private String localName; // Name of the local where the exam is happening
    private int nombreDesEtudiants; // Number of students in the exam
    private boolean reservist; // Indicates if the professor is a reservist
}