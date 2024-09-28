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
        this.strategies = userDTO.getStrategies();
        this.projects = userDTO.getProjects();
        this.projectExperience = userDTO.getProjectExperience();
    }

    public void merge(NgoUser ngoUser){
        super.merge(ngoUser);
        this.strategies = ngoUser.getStrategies();
        this.projects = ngoUser.getProjects();
        this.projectExperience = ngoUser.getProjectExperience();
    }

}