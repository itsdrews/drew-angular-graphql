package com.runner.training.domain.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import com.runner.training.domain.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // O Spring gera automaticamente a busca por email se precisarmos validar duplicatas
    Optional<User> findByEmail(String email);
}