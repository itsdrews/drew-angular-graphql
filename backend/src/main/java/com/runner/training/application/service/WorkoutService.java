package com.runner.training.application.service;

import com.runner.training.application.dto.WorkoutInput;
import com.runner.training.domain.model.Workout;
import com.runner.training.domain.repository.UserRepository;
import com.runner.training.domain.repository.WorkoutRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.runner.training.domain.model.User;
import org.springframework.security.core.Authentication;

@Service
public class WorkoutService {

    private final WorkoutRepository repository;
    private final UserRepository userRepository;

    // Injeção de dependência via construtor (Boa prática)
    public WorkoutService(WorkoutRepository repository,UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
        throw new RuntimeException("Usuário não autenticado! (Contexto vazio)");
    }

    Object principal = authentication.getPrincipal();
    String userEmail;

    // Cenário A: O Principal é a sua Entidade User (Seu filtro carregou do banco)
    if (principal instanceof User user) {
        return user;
    }
    
    // Cenário B: O Principal é um UserDetails do Spring (padrão)
    if (principal instanceof UserDetails userDetails) {
        userEmail = userDetails.getUsername();
    } 
    // Cenário C: O Principal é apenas uma String (Se o filtro for simples)
    else if (principal instanceof String email) {
        userEmail = email;
    } else {
        throw new RuntimeException("Tipo de principal desconhecido: " + principal.getClass());
    }

    // Busca final no banco para garantir que temos a Entidade Real
    return userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado no banco: " + userEmail));
}

    @Transactional
    public Workout scheduleWorkout(WorkoutInput input) {
        // 1. Descobrimos quem está logado
        User currentUser = getAuthenticatedUser();

        // 2. Criamos o treino associado a esse usuário
        Workout workout = new Workout(
                input.title(),
                input.dateTime(),
                input.distanceInKm(),
                input.durationInMinutes(),
                currentUser 
        );

        return repository.save(workout);
    }

    public List<Workout> findAll() {
        // 1. Descobrimos quem está logado
        User currentUser = getAuthenticatedUser();
        
        // 2. Buscamos APENAS os treinos dele
        return repository.findAllByUser(currentUser);
    }

    // --- UPDATE (Novo) ---
    @Transactional
    public Workout updateWorkout(Long id, WorkoutInput input) {
        User user = getAuthenticatedUser();

        // Busca segura: só retorna se for dono
        Workout workout = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado ou acesso negado."));

        // Atualiza os campos
        workout.setTitle(input.title());
        workout.setDateTime(input.dateTime());
        workout.setDistanceInKm(input.distanceInKm());
        workout.setDurationInMinutes(input.durationInMinutes());

        return repository.save(workout);
    }

    // --- DELETE (Novo) ---
    @Transactional
    public boolean deleteWorkout(Long id) {
        User user = getAuthenticatedUser();

        Workout workout = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado ou acesso negado."));

        repository.delete(workout);
        return true; // Retorna true confirmando a exclusão
    }
    
    
}