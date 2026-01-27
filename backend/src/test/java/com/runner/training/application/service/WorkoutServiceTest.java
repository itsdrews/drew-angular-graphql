package com.runner.training.application.service;

import com.runner.training.application.dto.WorkoutInput;
import com.runner.training.domain.model.Workout;
import com.runner.training.domain.repository.WorkoutRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceTest {

    @Mock
    private WorkoutRepository repository;

    @InjectMocks
    private WorkoutService service;

    @Test
    @DisplayName("Deve agendar um treino com sucesso")
    void shouldScheduleWorkout() {
        // Arrange
        WorkoutInput input = new WorkoutInput(
                "Corrida Leve",
                LocalDateTime.now().plusDays(1),
                5.0,
                30);

        // Simulamos que o repositório retorna um treino salvo com ID 1
        Workout savedWorkout = new Workout("Corrida Leve", input.dateTime(), 5.0, 30);
        when(repository.save(any(Workout.class))).thenReturn(savedWorkout);

        // Act
        Workout result = service.scheduleWorkout(input);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getTitle()).isEqualTo("Corrida Leve");

        // Verifica se o método save do repositório foi chamado exatamente uma vez
        verify(repository).save(any(Workout.class));
    }
}