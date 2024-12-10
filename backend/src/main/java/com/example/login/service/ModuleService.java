package com.example.login.service;
import com.example.login.entity.ModuleEntity;
import com.example.login.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    // Créer un module
    public ModuleEntity createModule(ModuleEntity module) {
        return moduleRepository.save(module);
    }

    // Récupérer tous les modules
    public List<ModuleEntity> getAllModules() {
        return moduleRepository.findAll();
    }

    // Récupérer les modules par optionId
    public List<ModuleEntity> getModulesByOptionId(Long optionId) {
        return moduleRepository.findByOptionId(optionId);
    }

    // Récupérer un module par son ID
    public Optional<ModuleEntity> getModuleById(Long id) {
        return moduleRepository.findById(id);
    }

    // Mettre à jour un module
    public ModuleEntity updateModule(Long id, ModuleEntity moduleDetails) {
        if (moduleRepository.existsById(id)) {
            moduleDetails.setId(id);
            return moduleRepository.save(moduleDetails);
        } else {
            return null;
        }
    }

    // Supprimer un module
    public boolean deleteModule(Long id) {
        if (moduleRepository.existsById(id)) {
            moduleRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
