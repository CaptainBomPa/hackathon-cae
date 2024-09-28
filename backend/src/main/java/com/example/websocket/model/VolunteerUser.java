package com.example.websocket.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Data
@Entity
@DiscriminatorValue("VOLUNTEER")
@NoArgsConstructor
public class VolunteerUser extends User {
    private String firstName;
    private String lastName;
    private String hobbies;

    public VolunteerUser(UserDTO userDTO) {
        super(userDTO);
    }
}
