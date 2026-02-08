package com.runner.training.api;

import com.runner.training.application.dto.WorkoutInput;
import com.runner.training.application.service.WorkoutService;
import com.runner.training.domain.model.Workout;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class WorkoutController {

    private final WorkoutService service;

    public WorkoutController(WorkoutService service) {
        this.service = service;
    }

    @MutationMapping
    public Workout scheduleWorkout(@Argument WorkoutInput input) {
        return service.scheduleWorkout(input);
    }

    // Implementação básica da Query para o schema não reclamar
    @QueryMapping
    public List<Workout> workouts() {
        return service.findAll();
    }

    @MutationMapping
    public Workout updateWorkout(@Argument Long id, @Argument WorkoutInput input) {
        return service.updateWorkout(id, input);
    }

    @MutationMapping
    public boolean deleteWorkout(@Argument Long id) {
        return service.deleteWorkout(id);
    }
}