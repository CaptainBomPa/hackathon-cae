package com.example.websocket.model;
import com.example.websocket.model.enums.BizService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@DiscriminatorValue("BIZ")
public class BizUser extends User {

    @ElementCollection
    @CollectionTable(name = "biz_user_services", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "service")
    private Set<String> services = new HashSet<>();

    public BizUser(UserDTO userDTO) {
        super(userDTO);
    }

    public void addService(BizService service) {
        services.add(service.name());
    }

    public Set<BizService> getServices() {
        Set<BizService> enumServices = new HashSet<>();
        for (String serviceName : services) {
            enumServices.add(BizService.valueOf(serviceName));
        }
        return enumServices;
    }
}