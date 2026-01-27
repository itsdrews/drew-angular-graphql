package com.runner.training.domain.repository;

import com.runner.training.domain.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    // Aqui podemos adicionar métodos de busca customizados futuramente
}