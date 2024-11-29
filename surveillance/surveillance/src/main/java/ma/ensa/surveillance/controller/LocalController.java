package ma.ensa.surveillance.controller;

import ma.ensa.surveillance.entity.Local;
import ma.ensa.surveillance.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locals")
public class LocalController {

    @Autowired
    private LocalService localService;

    @GetMapping
    public List<Local> getAllLocals() {
        return localService.getAllLocals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Local> getLocalById(@PathVariable int id) {
        return localService.getLocalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Local createLocal(@RequestBody Local local) {
        return localService.saveLocal(local);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Local> updateLocal(@PathVariable int id, @RequestBody Local localDetails) {
        try {
            return ResponseEntity.ok(localService.updateLocal(id, localDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocal(@PathVariable int id) {
        localService.deleteLocal(id);
        return ResponseEntity.noContent().build();
    }
}
