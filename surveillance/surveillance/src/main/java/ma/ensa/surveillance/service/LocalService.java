package ma.ensa.surveillance.service;


import ma.ensa.surveillance.entity.Local;
import ma.ensa.surveillance.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;

    public List<Local> getAllLocals() {
        return localRepository.findAll();
    }

    public Optional<Local> getLocalById(int id) {
        return localRepository.findById(id);
    }

    public Local saveLocal(Local local) {
        return localRepository.save(local);
    }

    public Local updateLocal(int id, Local localDetails) {
        return localRepository.findById(id).map(local -> {
            local.setNom(localDetails.getNom());
            local.setTaille(localDetails.getTaille());
            local.setType(localDetails.getType());
            return localRepository.save(local);
        }).orElseThrow(() -> new RuntimeException("Local not found"));
    }

    public void deleteLocal(int id) {
        localRepository.deleteById(id);
    }
}
