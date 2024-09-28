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
    protected long id;
    protected String name;
    protected String email;
    protected String password;
    protected Role role;
//    private String description;
//    private String location;
//    private String contactPerson;
//    private String contactPhone;
//    private String contactEmail;

    protected User(UserDTO userDTO) {
        this.name = userDTO.getName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.role = userDTO.getRole();
    }
}
