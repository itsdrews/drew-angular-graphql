package com.runner.training.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.runner.training.domain.model.Workout;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.assertj.core.api.Assertions.assertThat;

class WorkoutTest {

    @Test
    @DisplayName("Não deve agendar um treino com distância negativa")
    void shouldNotCreateWorkoutWithNegativeDistance() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Workout("Treino de Tiro", LocalDateTime.now().plusDays(1), -5.0,60);
        });
    }

    @Test
    @DisplayName("Deve criar um treino com dados válidos")
    void shouldCreateValidWorkout() {
        LocalDateTime futureDate = LocalDateTime.now().plusDays(2);
        Workout workout = new Workout("Longo de Domingo", futureDate, 15.0,60);
        
        assertThat(workout.getTitle()).isEqualTo("Longo de Domingo");
        assertThat(workout.getDistanceInKm()).isEqualTo(15.0);
    }
}
