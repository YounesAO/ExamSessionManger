package com.example.login.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS configuration for secure authentication
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS only for specific endpoints and specific origins
        registry.addMapping("/api/auth/**")  // Specify your authentication endpoints (e.g., login, register)
                .allowedOrigins("http://localhost:3001")  // Allow only trusted frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow all necessary HTTP methods
                .allowedHeaders("authorization", "content-type", "x-auth-token")  // Allow specific headers for authentication
                .allowCredentials(true);  // Allow credentials (cookies, authorization headers) to be sent

        // You can add more CORS configurations here for other specific endpoints if needed
    }
}
