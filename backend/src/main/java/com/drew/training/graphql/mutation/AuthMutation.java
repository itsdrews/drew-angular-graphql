package com.drew.training.graphql.mutation;

import com.drew.training.service.AuthService;
import com.drew.training.graphql.dto.AuthPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AuthMutation {

    private final AuthService authService;

    @MutationMapping
    public AuthPayload login(@Argument String email, @Argument String password) {
        String token = authService.login(email, password);
        return new AuthPayload(token);
    }
}