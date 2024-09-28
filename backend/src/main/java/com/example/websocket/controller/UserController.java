package com.example.websocket.controller;

import com.example.websocket.model.*;
import com.example.websocket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserDTO register(@RequestBody UserDTO userDTO) {
        User user = switch (Role.fromString(userDTO.getRole())) {
            case BIZ -> userService.register(new BizUser(userDTO));
            case NGO -> userService.register(new NgoUser(userDTO));
            case VOLUNTEER -> userService.register(new VolunteerUser(userDTO));
            default -> throw new IllegalArgumentException("User role doesn't match any expected value.");
        };
        userDTO.setId(user.getId());
        return userDTO;
    }

    @PostMapping("/login")
    public UserDTO login(@RequestBody LoginDTO credentials) {
        return userService.login(credentials.getEmail(), credentials.getPassword())
                .map(user -> UserDTO.builder().id(user.getId()).name(user.getName()).build())
                .orElse(null);
    }

    @GetMapping("/match")
    public List<UserDTO> getAllMatchedUsers(@RequestParam Long userId) {
        return userService.getAllMatchedUsers(userId);
    }

    @PutMapping(value = "/addPhoto/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> addPhoto(
            @PathVariable Long id,
            @RequestParam MultipartFile file) throws IOException {
        User updatedUser = userService.addPhoto(id, file);
        return ResponseEntity.ok(updatedUser);
    }

}
