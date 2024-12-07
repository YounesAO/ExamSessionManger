package com.example.login.service;

import com.example.login.Dto.LoginDTO;
import com.example.login.Dto.UserDTO;
import com.example.login.response.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    String addUser(UserDTO userDTO);
    LoginResponse loginUser(LoginDTO loginDTO);
}
