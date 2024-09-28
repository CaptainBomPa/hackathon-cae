package com.example.websocket.model;

import com.example.websocket.model.enums.CompanySize;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@DiscriminatorValue("BIZ")
public class BizUser extends User {
    private String strategies;
    private String socialGoals;
    private BigDecimal budget;
    private String partners;
    private String grants;
    @Enumerated(EnumType.STRING)
    private CompanySize companySize;

    public BizUser(UserDTO userDTO) {
        super(userDTO);
    }
}