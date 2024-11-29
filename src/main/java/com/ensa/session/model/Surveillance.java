package com.ensa.session.model;


import jakarta.persistence.*;

@Entity
@Table(name = "SURVEILLANCE")
public class Surveillance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "enseignant_id", nullable = false)
    private Enseignant enseignant;

    @Column(name = "is_reserviste", nullable = false)
    private Boolean isReserviste;

    @Enumerated(EnumType.STRING)
    @Column(name = "periode", nullable = false)
    private Periode periode;

    public enum Periode {
        MATIN, APRESMIDI
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Exam getExam() { return exam; }
    public void setExam(Exam exam) { this.exam = exam; }
    public Enseignant getEnseignant() { return enseignant; }
    public void setEnseignant(Enseignant enseignant) { this.enseignant = enseignant; }
    public Boolean getIsReserviste() { return isReserviste; }
    public void setIsReserviste(Boolean isReserviste) { this.isReserviste = isReserviste; }
    public Periode getPeriode() { return periode; }
    public void setPeriode(Periode periode) { this.periode = periode; }
}