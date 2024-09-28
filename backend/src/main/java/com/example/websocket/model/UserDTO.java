package com.example.websocket.model;

import com.example.websocket.model.enums.CompanySize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private long id;
    private String name;
    private String email;
    private String password;
    private String role;

    //NGO
    private String projects;
    private String projectExperience;

    //BIZ,NGO
    private String strategies;
    private String socialGoals;

    //BIZ
    private BigDecimal budget;
    private String partners;
    private String grants;
    @Enumerated(EnumType.STRING)
    private CompanySize companySize;

    //VOLUNTEER
    private String firstName;
    private String lastName;
    private String description;
    private String hobbies;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole().toString();
    }

    public void merge(NgoUser ngoUser) {
        mergeBasicUserInfo(ngoUser);
        this.strategies = ngoUser.getStrategies();
        this.projects = ngoUser.getProjects();
        this.projectExperience = ngoUser.getProjectExperience();
        this.socialGoals = ngoUser.getSocialGoals();
    }

    public void merge(BizUser bizUser) {
        mergeBasicUserInfo(bizUser);
        this.partners = bizUser.getPartners();
        this.budget = bizUser.getBudget();
        this.grants = bizUser.getGrants();
        this.strategies = bizUser.getStrategies();
        this.socialGoals = bizUser.getSocialGoals();
        this.companySize = bizUser.getCompanySize();
    }

    public void merge(VolunteerUser volunteerUser) {
        mergeBasicUserInfo(volunteerUser);
        this.firstName = volunteerUser.getFirstName();
        this.lastName = volunteerUser.getLastName();
        this.description = volunteerUser.getDescription();
        this.hobbies = volunteerUser.getHobbies();
    }

    private void mergeBasicUserInfo(User user){
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole().toString();
        this.socialGoals = user.getSocialGoals();
        this.description = user.getDescription();
    }
}
