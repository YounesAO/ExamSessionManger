package com.example.login.repository;




import com.example.login.entity.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
    List<Enseignant> findByFirstName(String firstName);
    List<Enseignant> findByLastName(String lastName);
    List<Enseignant> findByDepartementName(String departementName);
    List<Enseignant> findByDepartementId(Long id);
}
