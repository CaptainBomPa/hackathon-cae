package com.example.websocket.user;

import lombok.Getter;

@Getter
public class AppUserDTO {
    private final Long id;
    private final String name;

    public AppUserDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
