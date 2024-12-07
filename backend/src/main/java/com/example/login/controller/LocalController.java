package com.example.login.controller;

import com.example.login.entity.Local;
import com.example.login.service.LocalService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locals")

public class LocalController {

    @Autowired
    private LocalService localService;

    @PostMapping("/save")
    public ResponseEntity<Local> save(@RequestBody Local local) {
        Local savedLocal = localService.save(local);
        return new ResponseEntity<>(savedLocal, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") int id){
        boolean deleted = localService.delete(id);
        if(deleted){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT) ;
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Local>> findAll(){
        List<Local> locals = localService.findAll();
        return new ResponseEntity<>(locals, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countLocal(){
        long count = localService.countLocals();
        return new ResponseEntity<>(count, HttpStatus.OK) ;
    }


    @Operation(summary = "Recuperer tous les locaux")
    @GetMapping("/locals")
    public List<Local> getAllLocals(){
        return localService.findAll();
    }
}
