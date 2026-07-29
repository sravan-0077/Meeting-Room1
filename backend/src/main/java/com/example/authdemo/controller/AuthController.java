package com.example.authdemo.controller;

import com.example.authdemo.dto.*;
import com.example.authdemo.model.User;
import com.example.authdemo.repository.UserRepository;
import com.example.authdemo.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (signUpRequest.getEmail() == null || signUpRequest.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email is required"));
        }
        if (signUpRequest.getPassword() == null || signUpRequest.getPassword().trim().length() < 6) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Password must be at least 6 characters long"));
        }
        if (signUpRequest.getFullName() == null || signUpRequest.getFullName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Full Name is required"));
        }

        String email = signUpRequest.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, "An account with this email already exists!"));
        }

        User user = new User(
                signUpRequest.getFullName().trim(),
                email,
                passwordEncoder.encode(signUpRequest.getPassword())
        );

        User savedUser = userRepository.save(user);

        String jwt = tokenProvider.generateToken(savedUser.getEmail());

        UserDto userDto = new UserDto(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt()
        );

        return ResponseEntity.ok(new AuthResponse(jwt, userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email and password are required"));
        }

        String email = loginRequest.getEmail().trim().toLowerCase();

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid email or password"));
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid email or password"));
        }

        String jwt = tokenProvider.generateToken(user.getEmail());

        UserDto userDto = new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getCreatedAt()
        );

        return ResponseEntity.ok(new AuthResponse(jwt, userDto));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Unauthorized access"));
        }

        UserDto userDto = new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getCreatedAt()
        );

        return ResponseEntity.ok(userDto);
    }
}
