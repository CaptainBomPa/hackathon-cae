package com.example.websocket.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String password;
    private Role role;
}
