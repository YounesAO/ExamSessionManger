package com.example.login.repository;


import com.example.login.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);


    Optional<User> findByUsername(String username);

    @Modifying
    @Query("UPDATE User u SET u.password = :password WHERE u.email = :email")
    void updatePassword(@Param("email") String email, @Param("password") String password);
}



