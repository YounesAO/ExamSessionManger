package com.example.login.controller;

import com.example.login.Dto.LoginDTO;
import com.example.login.Dto.UserDTO;
import com.example.login.response.LoginResponse;
import com.example.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")

public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/save")
    @ResponseBody
    public String saveUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @PostMapping(path = "/login")
    @ResponseBody
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
