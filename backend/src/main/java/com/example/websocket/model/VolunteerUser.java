package com.example.websocket.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("VOLUNTEER")
public class VolunteerUser extends User {
    private String firstName;
    private String lastName;
    private String description;
    private String hobbies;
}
