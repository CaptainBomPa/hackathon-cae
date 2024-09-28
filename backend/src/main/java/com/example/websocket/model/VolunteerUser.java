package com.example.websocket.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

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
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.hobbies = userDTO.getHobbies();
    }

    public void merge(VolunteerUser volunteerUser) {
        super.merge(volunteerUser);
        this.firstName = volunteerUser.getFirstName();
        this.lastName = volunteerUser.getLastName();
        this.hobbies = volunteerUser.getHobbies();
    }
}
