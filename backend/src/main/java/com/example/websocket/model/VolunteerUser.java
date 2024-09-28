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
@DiscriminatorValue("VOLUNTEER")
@NoArgsConstructor
public class VolunteerUser extends User {
    private String firstName;
    private String lastName;
    private String description;
    private String hobbies;

    public VolunteerUser(UserDTO userDTO) {
        super(userDTO);
    }
}
