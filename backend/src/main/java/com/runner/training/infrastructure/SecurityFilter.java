package com.runner.training.infrastructure;


import com.runner.training.application.service.TokenService;
import com.runner.training.domain.repository.UserRepository;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    public SecurityFilter(TokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        var token = this.recoverToken(request);
        
        if (token != null) {
            var email = tokenService.validateToken(token);
            var user = userRepository.findByEmail(email);

            if (user.isPresent()) {
                // Se o usuário existe, criamos o objeto de autenticação do Spring
                var authentication = new UsernamePasswordAuthenticationToken(
                        user.get(), null, user.get().getAuthorities());
                
                // Definimos o usuário autenticado no contexto do Spring
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        // Segue o fluxo da requisição
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}