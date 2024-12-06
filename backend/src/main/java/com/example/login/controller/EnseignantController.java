package com.example.login.controller;

import com.example.login.entity.Enseignant;
import com.example.login.service.EnseignantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enseignants")
public class EnseignantController {

    private final EnseignantService enseignantService;

    @Autowired
    public EnseignantController(EnseignantService enseignantService) {
        this.enseignantService = enseignantService;
    }

    // Fetch all enseignants
    @GetMapping
    public ResponseEntity<List<Enseignant>> getAllEnseignants() {
        return ResponseEntity.ok(enseignantService.getAllEnseignants());
    }

    // Fetch enseignants by first name
    @GetMapping("/search/firstName")
    public ResponseEntity<List<Enseignant>> getEnseignantsByFirstName(@RequestParam String firstName) {
        return ResponseEntity.ok(enseignantService.getEnseignantsByFirstName(firstName));
    }

    // Fetch enseignants by last name
    @GetMapping("/search/lastName")
    public ResponseEntity<List<Enseignant>> getEnseignantsByLastName(@RequestParam String lastName) {
        return ResponseEntity.ok(enseignantService.getEnseignantsByLastName(lastName));
    }

    // Fetch enseignants by department name
    @GetMapping("/search/departement")
    public ResponseEntity<List<Enseignant>> getAllByDepartementName(@RequestParam String departementName) {
        return ResponseEntity.ok(enseignantService.getAllByDepartementName(departementName));
    }

    // Fetch an enseignant by ID
    @GetMapping("/{id}")
    public ResponseEntity<Enseignant> getEnseignantById(@PathVariable Long id) {
        Optional<Enseignant> enseignant = enseignantService.getEnseignantById(id);
        return enseignant.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Get total count of enseignants
    @GetMapping("/count")
    public ResponseEntity<Long> getEnseignantCount() {
        return ResponseEntity.ok(enseignantService.getEnseignantCount());
    }

    // Add a new enseignant
    @PostMapping
    public ResponseEntity<Enseignant> addEnseignant(@RequestBody Enseignant enseignant) {
        return ResponseEntity.ok(enseignantService.addEnseignant(enseignant));
    }

    // Modify an enseignant
    @PutMapping("/{id}")
    public ResponseEntity<Enseignant> modifyEnseignant(@PathVariable Long id, @RequestBody Enseignant enseignant) {
        try {
            Enseignant updatedEnseignant = enseignantService.modifyEnseignant(id, enseignant);
            return ResponseEntity.ok(updatedEnseignant);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an enseignant by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Long id) {
        try {
            enseignantService.deleteEnseignant(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

