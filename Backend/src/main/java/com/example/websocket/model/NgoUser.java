package com.example.websocket.model;


import com.example.websocket.model.enums.NgoService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@DiscriminatorValue("NGO")
public class NgoUser extends User {

    @ElementCollection
    @CollectionTable(name = "ngo_user_services", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "service")
    private Set<String> services = new HashSet<>();


    public void addService(NgoService service) {
        services.add(service.name());
    }

    public Set<NgoService> getServices() {
        Set<NgoService> enumServices = new HashSet<>();
        for (String serviceName : services) {
            enumServices.add(NgoService.valueOf(serviceName));
        }
        return enumServices;
    }
}