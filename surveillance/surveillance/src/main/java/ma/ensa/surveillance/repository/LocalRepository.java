package ma.ensa.surveillance.repository;

import ma.ensa.surveillance.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends JpaRepository<Local, Integer> {
}
