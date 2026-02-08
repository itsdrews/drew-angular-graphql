package com.runner.training.application.dto;

import com.runner.training.domain.model.User;

public record AuthResponse(String token, User user) {}