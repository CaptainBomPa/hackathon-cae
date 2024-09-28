package com.example.websocket.model;


import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "\"user\"")
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String email;
    private String password;
    private Role role;
//    private String description;
//    private String location;
//    private String contactPerson;
//    private String contactPhone;
//    private String contactEmail;
}
