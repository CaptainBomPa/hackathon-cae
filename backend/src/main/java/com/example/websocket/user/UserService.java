package com.example.websocket.user;

import com.example.websocket.model.User;
import com.example.websocket.model.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository appUserRepository;

    public User register(User user) {
        return appUserRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        return appUserRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    public List<UserDTO> getAllUsers() {
        return appUserRepository.findAll().stream()
                .map(user -> UserDTO.builder().id(user.getId()).name(user.getName()).build())
                .collect(Collectors.toList());
    }
}
