package com.runner.training.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private LocalDateTime dateTime;
    private Double distanceInKm;
    private Integer durationInMinutes;

    // Relacionamento com o Usuário
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // Nome da coluna no banco (FK)
    private User user;

    // Construtor que fará o teste passar
    public Workout(String title, LocalDateTime dateTime, Double distanceInKm, Integer durationInMinutes,User user) {
        if (distanceInKm == null || distanceInKm <= 0) {
            throw new IllegalArgumentException("A distância deve ser positiva.");
        }
        if (durationInMinutes == null || durationInMinutes <= 0) {
            throw new IllegalArgumentException("A duração deve ser positiva.");
        }
        if (dateTime == null || dateTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("A data do treino não pode ser no passado.");
        }
        
        this.title = title;
        this.dateTime = dateTime;
        this.distanceInKm = distanceInKm;
        this.durationInMinutes = durationInMinutes;
        this.user=user;
    }
}