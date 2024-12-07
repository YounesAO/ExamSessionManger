package com.example.login.controller;

import com.example.login.entity.ModuleEntity; // Correction du nom de la classe 'ModuleEnitity' à 'ModuleEntity'
import com.example.login.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    // Créer un module
    @PostMapping
    public ResponseEntity<ModuleEntity> createModule(@RequestBody ModuleEntity module) {
        ModuleEntity createdModule = moduleService.createModule(module);
        return new ResponseEntity<>(createdModule, HttpStatus.CREATED);
    }

    // Obtenir tous les modules
    @CrossOrigin(origins = "http://localhost:3000")  // Ajustez cette URL selon votre front-end
    @GetMapping("/")
    public ResponseEntity<List<ModuleEntity>> getAllModules() {
        List<ModuleEntity> modules = moduleService.getAllModules();
        return new ResponseEntity<>(modules, HttpStatus.OK);
    }

    // Obtenir les modules par optionId
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byOption/{optionId}")
    public ResponseEntity<List<ModuleEntity>> getModulesByOptionId(@PathVariable Long optionId) {
        List<ModuleEntity> modules = moduleService.getModulesByOptionId(optionId);
        if (modules.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(modules, HttpStatus.OK);
    }

    // Obtenir un module par son ID
    @GetMapping("/{id}")
    public ResponseEntity<ModuleEntity> getModuleById(@PathVariable Long id) {
        Optional<ModuleEntity> module = moduleService.getModuleById(id);
        return module.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Mettre à jour un module
    @PutMapping("/{id}")
    public ResponseEntity<ModuleEntity> updateModule(@PathVariable Long id, @RequestBody ModuleEntity moduleDetails) {
        ModuleEntity updatedModule = moduleService.updateModule(id, moduleDetails);
        if (updatedModule != null) {
            return new ResponseEntity<>(updatedModule, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Supprimer un module
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable Long id) {
        if (moduleService.deleteModule(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
