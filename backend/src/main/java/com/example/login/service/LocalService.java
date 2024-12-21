package com.example.login.service;

import com.example.login.entity.Local;
import com.example.login.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class LocalService {


    @Autowired
    private LocalRepository localRepository;

    public Local save(Local local) {
        return localRepository.save(local);
    }

    public boolean delete(int id ){

        Optional<Local> studentOptional = Optional.ofNullable(localRepository.findById(id));
        if(studentOptional.isPresent()){
            localRepository.delete(studentOptional.get());
            return true;
        }else{
            return false;
    }
}

    public List<Local> findAll(){
    return localRepository.findAll() ;
    }

    public long countLocals(){
        return localRepository.count() ;
    }

    public Local modifier(Local local) {
        if (localRepository.existsById((int)local.getId())) {
            return localRepository.save(local);
        } else {
            throw new IllegalArgumentException("Local avec l'ID " + local.getId() + " n'existe pas.");
        }
    }



}