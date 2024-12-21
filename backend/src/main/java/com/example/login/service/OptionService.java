package com.example.login.service;

import com.example.login.entity.Option;
import com.example.login.repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OptionService {

    private final OptionRepository optionRepository;

    @Autowired
    public OptionService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    public Option createOption(Option option) {
        return optionRepository.save(option);
    }

    public List<Option> getAllOptions() {
        return optionRepository.findAll();
    }

    public Optional<Option> getOptionById(Long id) {
        return optionRepository.findById(id);
    }

    public Option updateOption(Long id, Option optionDetails) {
        return optionRepository.findById(id).map(option -> {
            option.setName(optionDetails.getName());
            return optionRepository.save(option);
        }).orElse(null);
    }

    public boolean deleteOption(Long id) {
        if (optionRepository.existsById(id)) {
            optionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
