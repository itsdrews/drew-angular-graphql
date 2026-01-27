package com.runner.training.api;

import com.runner.training.application.dto.WorkoutInput;
import com.runner.training.application.service.WorkoutService;
import com.runner.training.domain.model.Workout;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.graphql.test.tester.GraphQlTester;
import java.util.List;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@GraphQlTest(WorkoutController.class)
class WorkoutControllerTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    private WorkoutService workoutService;

    @Test
    @DisplayName("Deve agendar um treino via Mutation GraphQL")
    void shouldScheduleWorkoutMutation() {
        // Arrange: Simulamos a resposta do serviço
        Workout mockWorkout = new Workout("Treino de Teste", LocalDateTime.now().plusDays(1), 10.0, 60);
        when(workoutService.scheduleWorkout(any(WorkoutInput.class))).thenReturn(mockWorkout);

        // Language=GraphQL
        String mutation = """
                    mutation {
                        scheduleWorkout(input: {
                            title: "Treino de Teste",
                            dateTime: "2026-01-30T10:00:00",
                            distanceInKm: 10.0,
                            durationInMinutes: 60
                        }) {
                            id
                            title
                            distanceInKm
                        }
                    }
                """;

        // Act & Assert
        graphQlTester.document(mutation)
                .execute()
                .path("scheduleWorkout.title").entity(String.class).isEqualTo("Treino de Teste")
                .path("scheduleWorkout.distanceInKm").entity(Double.class).isEqualTo(10.0);
    }

    @Test
    @DisplayName("Deve listar todos os treinos")
    void shouldReturnAllWorkouts() {
        // Arrange: Mock do serviço retornando uma lista com 1 treino
        Workout mockWorkout = new Workout("Longo", LocalDateTime.now(), 15.0, 90);
        when(workoutService.findAll()).thenReturn(List.of(mockWorkout));

        // Language=GraphQL
        String query = """
                    query {
                        workouts {
                            title
                            distanceInKm
                            durationInMinutes
                        }
                    }
                """;

        // Act & Assert
        graphQlTester.document(query)
                .execute()
                .path("workouts[0].title").entity(String.class).isEqualTo("Longo")
                .path("workouts[0].distanceInKm").entity(Double.class).isEqualTo(15.0);
    }
}