package com.example.login.configuration;

import com.example.login.entity.User;
import com.example.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.annotation.PostConstruct;
import java.util.Optional;

@Configuration
public class DataBaseInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializeUsers() {
        try {
            Optional<User> existingUser = userRepository.findByEmail("miskaraminaa@gmail.com");
            if (existingUser.isEmpty()) {
                String encodedPassword = passwordEncoder.encode("miskar123");
                User user = new User("Miskar", "miskaraminaa@gmail.com", encodedPassword);
                userRepository.save(user);
            }
        } catch (Exception e) {
            System.err.println("Error initializing users: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
