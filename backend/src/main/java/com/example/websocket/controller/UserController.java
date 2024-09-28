package com.example.websocket.controller;

import com.example.websocket.model.*;
import com.example.websocket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody UserDTO userDTO) {
        return switch (userDTO.getRole()) {
            case BIZ -> userService.register(new BizUser(userDTO));
            case NGO -> userService.register(new NgoUser(userDTO));
            case VOLUNTEER -> userService.register(new VolunteerUser(userDTO));
            default -> throw new IllegalArgumentException("User role doesn't match any expected value.");
        };
    }

    @PostMapping("/login")
    public UserDTO login(@RequestBody Map<String, String> credentials) {
        return userService.login(credentials.get("email"), credentials.get("password"))
                .map(user -> UserDTO.builder().id(user.getId()).name(user.getName()).build())
                .orElse(null);
    }

    @GetMapping("/match")
    public List<UserDTO> getAllMatchedUsers(@RequestParam Long userId) {
        return userService.getAllMatchedUsers(userId);
    }
}
