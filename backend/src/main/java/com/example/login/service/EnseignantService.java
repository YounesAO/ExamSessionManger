package com.example.login.service;


import com.example.login.entity.Departement;
import com.example.login.entity.Enseignant;
import com.example.login.repository.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnseignantService {

    private final EnseignantRepository enseignantRepository;

    @Autowired
    public EnseignantService(EnseignantRepository enseignantRepository) {
        this.enseignantRepository = enseignantRepository;
    }

    // Fetch all enseignants
    public List<Enseignant> getAllEnseignants() {
        return enseignantRepository.findAll();
    }

    // Fetch enseignants by first name
    public List<Enseignant> getEnseignantsByFirstName(String firstName) {
        return enseignantRepository.findByFirstName(firstName);
    }

    // Fetch enseignants by last name
    public List<Enseignant> getEnseignantsByLastName(String lastName) {
        return enseignantRepository.findByLastName(lastName);
    }

    // Fetch enseignants by department name
    public List<Enseignant> getAllByDepartementName(String departementName) {
        return enseignantRepository.findByDepartementName(departementName);
    }

    // Fetch an enseignant by ID
    public Optional<Enseignant> getEnseignantById(Long id) {
        return enseignantRepository.findById(id);
    }

    // Get total count of enseignants
    public long getEnseignantCount() {
        return enseignantRepository.count();
    }

    // Add a new enseignant
    public Enseignant addEnseignant(Enseignant enseignant) {
        return enseignantRepository.save(enseignant);
    }

    // Modify an existing enseignant
    public Enseignant modifyEnseignant(Long id, Enseignant updatedEnseignant) {
        Optional<Enseignant> existingEnseignant = enseignantRepository.findById(id);
        if (existingEnseignant.isPresent()) {
            Enseignant enseignant = existingEnseignant.get();
            enseignant.setFirstName(updatedEnseignant.getFirstName());
            enseignant.setLastName(updatedEnseignant.getLastName());
            enseignant.setPhoneNumber(updatedEnseignant.getPhoneNumber());
            enseignant.setEmail(updatedEnseignant.getEmail());
            enseignant.setDispense(updatedEnseignant.getDispense());
            enseignant.setDepartement(updatedEnseignant.getDepartement());
            return enseignantRepository.save(enseignant);
        } else {
            throw new IllegalArgumentException("Enseignant with ID " + id + " does not exist.");
        }
    }

    // Delete an enseignant by ID
    public void deleteEnseignant(Long id) {
        if (enseignantRepository.existsById(id)) {
            enseignantRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Enseignant with ID " + id + " does not exist.");
        }
    }
}
