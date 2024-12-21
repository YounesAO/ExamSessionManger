package com.example.login.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;  // Import correct

@Entity
public class ModuleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "option_id")
    @JsonBackReference  // Evite la sérialisation infinie de la relation enfant
    private Option option;

    // Getters et Setters
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

    public Option getOption() {
        return option;
    }

    public void setOption(Option option) {
        this.option = option;
    }
}
