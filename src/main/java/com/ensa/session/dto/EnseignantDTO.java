package com.ensa.session.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnseignantDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private Long departementId;
}