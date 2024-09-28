package com.example.websocket.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("NGO")
public class NgoUser extends User {

    private String strategies;
    private String projects;
    private String projectExperience;
    private String socialGoals;
}