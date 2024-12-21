package com.example.login.controller;

import com.example.login.entity.Option;
import com.example.login.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/options")
public class OptionController {

    private final OptionService optionService;

    @Autowired
    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    // Create a new Option
    @PostMapping
    public ResponseEntity<Option> createOption(@RequestBody Option option) {
        Option createdOption = optionService.createOption(option);
        return ResponseEntity.ok(createdOption);
    }

    // Get all Options
    @GetMapping
    public List<Option> getAllOptions() {
        return optionService.getAllOptions();
    }

    // Get an Option by ID
    @GetMapping("/{id}")
    public ResponseEntity<Option> getOptionById(@PathVariable Long id) {
        Optional<Option> option = optionService.getOptionById(id);
        return option.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an Option
    @PutMapping("/{id}")
    public ResponseEntity<Option> updateOption(@PathVariable Long id, @RequestBody Option optionDetails) {
        Option updatedOption = optionService.updateOption(id, optionDetails);
        return updatedOption != null ? ResponseEntity.ok(updatedOption) : ResponseEntity.notFound().build();
    }

    // Delete an Option
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
        return optionService.deleteOption(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
