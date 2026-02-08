package com.runner.training.application.service;

import org.springframework.stereotype.*;
import com.runner.training.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;


import com.runner.training.application.dto.AuthResponse;
import com.runner.training.application.dto.LoginInput;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public AuthResponse authenticate(LoginInput input) {
        var user = userRepository.findByEmail(input.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(input.password(), user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = tokenService.generateToken(user);
        return new AuthResponse(token, user);
    }


}