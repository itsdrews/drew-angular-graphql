package com.runner.training.application.dto;

import java.time.LocalDateTime;

public record WorkoutInput(
        String title,
        LocalDateTime dateTime,
        Double distanceInKm,
        Integer durationInMinutes) {
}