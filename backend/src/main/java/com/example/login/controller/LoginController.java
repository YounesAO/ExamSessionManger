package com.example.login.controller;

import com.example.login.Dto.LoginDTO;
import com.example.login.Dto.UserDTO;
import com.example.login.response.LoginResponse;
import com.example.login.service.JwtUtil;
import com.example.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")

public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO loginData) {
        Map<String, String> response = new HashMap<>();
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.getEmail(),
                            loginData.getPassword()
                    )
            );

            // Generate the JWT token
            String token = jwtUtil.generateToken(auth.getName());
            response.put("token", token);
            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}