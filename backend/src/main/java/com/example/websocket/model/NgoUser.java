package com.example.websocket.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("NGO")
@NoArgsConstructor
public class NgoUser extends User {

    private String strategies;
    private String projects;
    private String projectExperience;
    private String socialGoals;

    public NgoUser(UserDTO userDTO) {
        super(userDTO);
    }

}