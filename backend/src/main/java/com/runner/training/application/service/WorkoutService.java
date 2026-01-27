package com.runner.training.application.service;

import com.runner.training.application.dto.WorkoutInput;
import com.runner.training.domain.model.Workout;
import com.runner.training.domain.repository.WorkoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository repository;

    // Injeção de dependência via construtor (Boa prática)
    public WorkoutService(WorkoutRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Workout scheduleWorkout(WorkoutInput input) {
        // Converte o DTO (Input) para a Entidade de Domínio
        Workout workout = new Workout(
                input.title(),
                input.dateTime(),
                input.distanceInKm(),
                input.durationInMinutes());

        // Persiste
        return repository.save(workout);

    }

    public List<Workout> findAll() {
        // Simplesmente delega para o repositório (JPA)
        return repository.findAll();
    }
}