package com.example.login.impl;

import com.example.login.Dto.LoginDTO;
import com.example.login.Dto.UserDTO;
import com.example.login.entity.User;
import com.example.login.repository.UserRepository;
import com.example.login.response.LoginResponse;
import com.example.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserImpL implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getUsername(),
                userDTO.getEmail(),
                passwordEncoder.encode(userDTO.getPassword())
        );
        userRepository.save(user);
        return user.getUsername();
    }

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        Optional<User> user = userRepository.findByEmail(loginDTO.getEmail());
        if (user.isPresent()) {
            boolean isPwdRight = passwordEncoder.matches(loginDTO.getPassword(), user.get().getPassword());
            if (isPwdRight) {
                return new LoginResponse("Login Success", true);
            } else {
                return new LoginResponse("Incorrect password", false);
            }
        } else {
            return new LoginResponse("Email not found", false);
        }
    }
}
