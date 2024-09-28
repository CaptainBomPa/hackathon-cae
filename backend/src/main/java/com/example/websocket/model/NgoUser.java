package com.example.websocket.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Data
@Entity
@DiscriminatorValue("NGO")
@NoArgsConstructor
public class NgoUser extends User {

    private String strategies;
    private String projects;
    private String projectExperience;

    public NgoUser(UserDTO userDTO) {
        super(userDTO);
    }

}