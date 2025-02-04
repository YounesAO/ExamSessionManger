package com.example.login.repository;


import com.example.login.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LocalRepository extends JpaRepository<Local, Integer> {

    Local findById(int id);


}
