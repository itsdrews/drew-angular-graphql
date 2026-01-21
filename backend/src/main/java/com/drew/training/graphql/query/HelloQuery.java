package com.drew.training.graphql.query;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class HelloQuery {

    @QueryMapping
    public String hello() {
        return "GraphQL is running 🚀";
    }
}