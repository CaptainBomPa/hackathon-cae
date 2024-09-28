package com.example.websocket.model;

import com.example.websocket.model.enums.CompanySize;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@DiscriminatorValue("BUSINESS")
@NoArgsConstructor
public class BizUser extends User {
    private String strategies;
    private BigDecimal budget;
    private String partners;
    private String grants;
    @Enumerated(EnumType.STRING)
    private CompanySize companySize;

    public BizUser(UserDTO userDTO) {
        super(userDTO);
        this.partners = userDTO.getPartners();
        this.budget = userDTO.getBudget();
        this.grants = userDTO.getGrants();
        this.strategies = userDTO.getStrategies();
        this.companySize = userDTO.getCompanySize();
    }

    public void merge(BizUser bizUser) {
        super.merge(bizUser);
        this.partners = bizUser.getPartners();
        this.budget = bizUser.getBudget();
        this.grants = bizUser.getGrants();
        this.strategies = bizUser.getStrategies();
        this.companySize = bizUser.getCompanySize();
    }
}