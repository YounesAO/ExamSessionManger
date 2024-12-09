package com.example.login.service;

import com.example.login.Dto.SurveillanceDTO;
import com.example.login.entity.Surveillance;
import com.example.login.repository.SurveillanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SurveillanceService {

    private final SurveillanceRepository surveillanceRepository;

    public SurveillanceService(SurveillanceRepository surveillanceRepository) {
        this.surveillanceRepository = surveillanceRepository;
    }

    public List<SurveillanceDTO> getSurveillances(Long departmentId, String date) {
        LocalDate parsedDate = LocalDate.parse(date); // Convert String to LocalDate
        List<Surveillance> surveillances = surveillanceRepository.findByDateAndTimeSlot(parsedDate, "Matin"); // Example time slot
        return surveillances.stream()
                .filter(s -> s.getEnseignant().getDepartement().getId().equals(departmentId)) // Filter by department
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private SurveillanceDTO mapToDTO(Surveillance surveillance) {
        SurveillanceDTO dto = new SurveillanceDTO();
        dto.setId(surveillance.getId());
        dto.setEnseignantName(surveillance.getEnseignant().getFirstName() + " " + surveillance.getEnseignant().getLastName());
        dto.setExamName(surveillance.getExam().getName());
        dto.setExamDate(surveillance.getDate().toString());
        dto.setTimeSlot(surveillance.getTimeSlot());
        dto.setReservist(surveillance.isReservist());
        dto.setLocalName(surveillance.getExam().getLocal().getNom());
        dto.setNombreDesEtudiants(surveillance.getExam().getNombreDesEtudiants());
        return dto;
    }
}
