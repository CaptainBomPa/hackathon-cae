package com.example.websocket.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @PostMapping("/register")
    public AppUser register(@RequestBody AppUser user) {
        return appUserService.register(user);
    }

    @PostMapping("/login")
    public AppUserDTO login(@RequestBody Map<String, String> credentials) {
        return appUserService.login(credentials.get("email"), credentials.get("password"))
                .map(user -> new AppUserDTO(user.getId(), user.getName()))
                .orElse(null);
    }

    @GetMapping
    public List<AppUserDTO> getAllUsers() {
        return appUserService.getAllUsers();
    }
}
