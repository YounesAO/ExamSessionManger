package com.example.login.controller;

import com.example.login.Dto.MailBody;
import com.example.login.entity.ForgotPassword;
import com.example.login.entity.User;
import com.example.login.repository.ForgotPasswordRepository;
import com.example.login.repository.UserRepository;
import com.example.login.service.EmailService;
import com.example.login.utils.ChangePassword;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;




@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordController(UserRepository userRepository, ForgotPasswordRepository forgotPasswordRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    // Send email for email verification
    @PostMapping("/verification/{email}")
    public ResponseEntity<String> verification(@PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email"));

        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your forgot password request: " + otp)
                .subject("OTP for Forgot Password Request")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) // Fixed field name
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(fp);

        return ResponseEntity.ok("Email sent for verification!");
    }

    @PostMapping("/verifyOTP/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email"));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid OTP for this email: " + email));

        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired", HttpStatus.EXPECTATION_FAILED);
        }

        forgotPasswordRepository.deleteById(fp.getFpid());
        return ResponseEntity.ok("OTP verified");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(
            @RequestBody ChangePassword changePassword,
            @PathVariable String email) {

        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Passwords do not match!", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password has been changed");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
