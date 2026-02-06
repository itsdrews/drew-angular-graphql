package com.runner.training.domain.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Table(name = "users")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String password; // Lembre-se: em produção, nunca salve em texto claro!

    public User(String name,String email, String password){
      this.name = name;
      this.email = email;
      this.password = password;
    }
}