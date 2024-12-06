package com.example.login.entity;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_type", nullable = false)
    private String sessionType;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "exam1_start")
    private LocalTime exam1Start;

    @Column(name = "exam1_end")
    private LocalTime exam1End;

    @Column(name = "exam2_start")
    private LocalTime exam2Start;

    @Column(name = "exam2_end")
    private LocalTime exam2End;

    @Column(name = "exam3_start")
    private LocalTime exam3Start;

    @Column(name = "exam3_end")
    private LocalTime exam3End;

    @Column(name = "exam4_start")
    private LocalTime exam4Start;

    @Column(name = "exam4_end")
    private LocalTime exam4End;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalTime getExam1Start() {
        return exam1Start;
    }

    public void setExam1Start(LocalTime exam1Start) {
        this.exam1Start = exam1Start;
    }

    public LocalTime getExam1End() {
        return exam1End;
    }

    public void setExam1End(LocalTime exam1End) {
        this.exam1End = exam1End;
    }

    public LocalTime getExam2Start() {
        return exam2Start;
    }

    public void setExam2Start(LocalTime exam2Start) {
        this.exam2Start = exam2Start;
    }

    public LocalTime getExam2End() {
        return exam2End;
    }

    public void setExam2End(LocalTime exam2End) {
        this.exam2End = exam2End;
    }

    public LocalTime getExam3Start() {
        return exam3Start;
    }

    public void setExam3Start(LocalTime exam3Start) {
        this.exam3Start = exam3Start;
    }

    public LocalTime getExam3End() {
        return exam3End;
    }

    public void setExam3End(LocalTime exam3End) {
        this.exam3End = exam3End;
    }

    public LocalTime getExam4Start() {
        return exam4Start;
    }

    public void setExam4Start(LocalTime exam4Start) {
        this.exam4Start = exam4Start;
    }

    public LocalTime getExam4End() {
        return exam4End;
    }

    public void setExam4End(LocalTime exam4End) {
        this.exam4End = exam4End;
    }
}

