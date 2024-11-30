package com.example.login.service;

import com.example.login.entity.Departement;
import com.example.login.repository.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartementService {

    private final DepartementRepository departementRepository;

    @Autowired
    public DepartementService(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    // Fetch all departements
    public List<Departement> getAllDepartements() {
        return departementRepository.findAll();
    }

    // Get the total count of departements
    public long getDepartementCount() {
        return departementRepository.count();
    }

    // Fetch a specific departement by name
    public Optional<Departement> getDepartementByName(String name) {
        return departementRepository.findByName(name);
    }

    // Fetch a specific departement by ID
    public Optional<Departement> getDepartementById(Long id) {
        return departementRepository.findById(id);
    }

    // Create or update a departement
    public Departement saveDepartement(Departement departement) {
        return departementRepository.save(departement);
    }

    public Departement modifyDepartement(Long id, String newName) {
        Optional<Departement> existingDepartement = departementRepository.findById(id);
        if (existingDepartement.isPresent()) {
            Departement departement = existingDepartement.get();
            departement.setName(newName);
            return departementRepository.save(departement);
        } else {
            throw new IllegalArgumentException("Departement with ID " + id + " does not exist.");
        }
    }

    // Delete a departement by ID
    public void deleteDepartement(Long id) {
        if (departementRepository.existsById(id)) {
            departementRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Departement with ID " + id + " does not exist.");
        }
    }
}
