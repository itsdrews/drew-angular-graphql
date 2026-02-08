package com.runner.training.api;

import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.graphql.data.method.annotation.Argument;
import com.runner.training.domain.model.User;
import com.runner.training.application.dto.AuthResponse;
import com.runner.training.application.dto.LoginInput;
import com.runner.training.application.dto.UserInput;
import com.runner.training.application.service.AuthService;
import com.runner.training.application.service.TokenService;
import com.runner.training.domain.repository.*;


import java.util.List;;

@Controller
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final TokenService tokenService;

    public UserController(UserRepository userRepository,PasswordEncoder passwordEncoder,AuthService authService,TokenService tokenService) {
        this.tokenService = tokenService;
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @QueryMapping
    public List<User> users() {
        return userRepository.findAll();
    }
    
    @MutationMapping
    public AuthResponse register(@Argument UserInput input) {
        // Criptografamos aqui, antes de mandar para o banco
        String encryptedPassword = passwordEncoder.encode(input.password());
        User user = new User(input.name(), input.email(), encryptedPassword);
        User savedUser = userRepository.save(user);
        String token = tokenService.generateToken(savedUser);
        // .save() é o método padrão do Spring Data JPA para inserir no banco
        return new AuthResponse(token, savedUser);
    }

    @MutationMapping
    public AuthResponse login(@Argument LoginInput input) {
        return authService.authenticate(input);
    }
}
