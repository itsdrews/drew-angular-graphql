package com.runner.training.api;

import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import com.runner.training.domain.model.User;
import com.runner.training.application.dto.UserInput;
import com.runner.training.domain.repository.*;
import com.runner.training.domain.model.*;

import java.util.List;;

@Controller
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @QueryMapping
    public List<User> users() {
        return userRepository.findAll();
    }

    @MutationMapping
    public User createUser(@Argument UserInput input) {
        User user = new User(input.name(), input.email(), input.password());
        return userRepository.save(user);
    }
}
