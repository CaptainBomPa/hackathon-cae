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

    public VolunteerUser(UserDTO userDTO) {
        super(userDTO);
    }
}
