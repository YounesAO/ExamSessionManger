package com.example.login.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "nombre_etudiants", nullable = false)
    private int nombreDesEtudiants;

    @Column(name = "exam_date", nullable = false)
    private LocalDate examDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;

    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)
    private ModuleEntity module;

    @ManyToOne
    @JoinColumn(name = "option_id", nullable = false)
    private Option option;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private Enseignant instructor;

    // Constructors
    public Exam() {}

    public Exam(String name, LocalDate examDate, LocalTime startTime, LocalTime endTime, Session session, Local local, ModuleEntity module, Option option, Enseignant instructor) {
        this.name = name;
        this.examDate = examDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.session = session;
        this.local = local;
        this.module = module;
        this.option = option;
        this.instructor = instructor;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNombreDesEtudiants() {
        return nombreDesEtudiants;
    }

    public void setNombreDesEtudiants(int nombreDesEtudiants) {
        this.nombreDesEtudiants = nombreDesEtudiants;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public ModuleEntity getModule() {
        return module;
    }

    public void setModule(ModuleEntity module) {
        this.module = module;
    }

    public Option getOption() {
        return option;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Enseignant getInstructor() {
        return instructor;
    }

    public void setInstructor(Enseignant instructor) {
        this.instructor = instructor;
    }
}
