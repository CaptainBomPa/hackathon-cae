package com.example.websocket.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
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
    private String socialGoals;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_id", referencedColumnName = "id")
    private Photo photo;
    private String description;

//    private String location;
//    private String contactPerson;
//    private String contactPhone;
//    private String contactEmail;

    protected User(UserDTO userDTO) {
        if (userDTO.getId() != 0) {
            this.id = userDTO.getId();
        }
        this.name = userDTO.getName();
        this.email = userDTO.getEmail();
        this.description = userDTO.getDescription();
        this.socialGoals = userDTO.getSocialGoals();
        this.password = userDTO.getPassword();
        this.role = Role.valueOf(userDTO.getRole());
    }

    protected void merge(User user){
        this.description = user.getDescription();
        this.socialGoals = user.getSocialGoals();
    }
}
