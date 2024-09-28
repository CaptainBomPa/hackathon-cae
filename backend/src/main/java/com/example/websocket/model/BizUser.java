package com.example.websocket.model;

import com.example.websocket.model.enums.CompanySize;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

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
    }
}