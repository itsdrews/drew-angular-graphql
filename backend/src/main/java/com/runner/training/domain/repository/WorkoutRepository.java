package com.runner.training.domain.repository;

import com.runner.training.domain.model.User;
import com.runner.training.domain.model.Workout;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
 
    List<Workout>findAllByUser(User user);

    Optional<Workout> findByIdAndUser(Long id, User user);
}