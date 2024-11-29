package com.ensa.session.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "EXAM")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "departement_id", nullable = false)
    private Departement departement;

    @ManyToOne
    @JoinColumn(name = "enseignant_responsable_id", nullable = false)
    private Enseignant enseignantResponsable;

    @Column(name = "option", nullable = false)
    private String option;

    @Column(name = "module", nullable = false)
    private String module;

    @Column(name = "nb_etudiant_inscrit", nullable = false)
    private Integer nbEtudiantInscrit;

    @ManyToOne
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @Column(name = "date_exam", nullable = false)
    private LocalDateTime dateExam;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<Surveillance> surveillances;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Departement getDepartement() { return departement; }
    public void setDepartement(Departement departement) { this.departement = departement; }
    public Enseignant getEnseignantResponsable() { return enseignantResponsable; }
    public void setEnseignantResponsable(Enseignant enseignantResponsable) { this.enseignantResponsable = enseignantResponsable; }
    public String getOption() { return option; }
    public void setOption(String option) { this.option = option; }
    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }
    public Integer getNbEtudiantInscrit() { return nbEtudiantInscrit; }
    public void setNbEtudiantInscrit(Integer nbEtudiantInscrit) { this.nbEtudiantInscrit = nbEtudiantInscrit; }
    public Local getLocal() { return local; }
    public void setLocal(Local local) { this.local = local; }
    public Session getSession() { return session; }
    public void setSession(Session session) { this.session = session; }
    public LocalDateTime getDateExam() { return dateExam; }
    public void setDateExam(LocalDateTime dateExam) { this.dateExam = dateExam; }
    public List<Surveillance> getSurveillances() { return surveillances; }
    public void setSurveillances(List<Surveillance> surveillances) { this.surveillances = surveillances; }
}
