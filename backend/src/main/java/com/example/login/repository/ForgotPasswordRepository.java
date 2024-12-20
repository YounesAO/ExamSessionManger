package com.example.login.repository;

import com.example.login.entity.ForgotPassword;
import com.example.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);
}
