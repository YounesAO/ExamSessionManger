package com.example.login.controller;

import com.example.login.entity.Departement;
import com.example.login.service.DepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departements")
public class DepartementController {

    private final DepartementService departementService;

    @Autowired
    public DepartementController(DepartementService departementService) {
        this.departementService = departementService;
    }

    // Fetch all departements
    @GetMapping
    public ResponseEntity<List<Departement>> getAllDepartements() {
        List<Departement> departements = departementService.getAllDepartements();
        return ResponseEntity.ok(departements);
    }

    // Get the total count of departements
    @GetMapping("/count")
    public ResponseEntity<Long> getDepartementCount() {
        long count = departementService.getDepartementCount();
        return ResponseEntity.ok(count);
    }

    // Fetch a specific departement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Departement> getDepartementById(@PathVariable Long id) {
        Optional<Departement> departement = departementService.getDepartementById(id);
        return departement.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Fetch a specific departement by name
    @GetMapping("/search/{name}")
    public ResponseEntity<Departement> getDepartementByName(@PathVariable String name) {
        Optional<Departement> departement = departementService.getDepartementByName(name);
        return departement.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create a new departement
    @PostMapping
    public ResponseEntity<Departement> createDepartement(@RequestBody Departement departement) {
        Departement savedDepartement = departementService.saveDepartement(departement);
        return ResponseEntity.ok(savedDepartement);
    }

    // Update an existing departement
    @PutMapping("/{id}")
    public ResponseEntity<Departement> modifyDepartement(@PathVariable Long id, @RequestBody String newName) {
        try {
            Departement updatedDepartement = departementService.modifyDepartement(id, newName);
            return ResponseEntity.ok(updatedDepartement);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a departement by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
        try {
            departementService.deleteDepartement(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
