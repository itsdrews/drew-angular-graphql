package com.runner.training.infrastructure.repository;

import com.runner.training.domain.model.Workout;
import com.runner.training.domain.repository.WorkoutRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Usa o Postgres do application.properties
class WorkoutRepositoryTest {

    @Autowired
    private WorkoutRepository repository;

    @Test
    @DisplayName("Deve persistir um treino e gerar um ID")
    void shouldSaveWorkout() {
        // Arrange
        Workout workout = new Workout("Intervalado 5x1km", LocalDateTime.now().plusDays(1), 7.0, 45);

        // Act
        Workout savedWorkout = repository.save(workout);

        // Assert
        assertThat(savedWorkout.getId()).isNotNull();
        assertThat(savedWorkout.getTitle()).isEqualTo("Intervalado 5x1km");
    }
}