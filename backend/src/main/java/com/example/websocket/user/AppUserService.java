package com.example.websocket.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUser register(AppUser user) {
        return appUserRepository.save(user);
    }

    public Optional<AppUser> login(String email, String password) {
        return appUserRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    public List<AppUserDTO> getAllUsers() {
        return appUserRepository.findAll().stream()
                .map(user -> new AppUserDTO(user.getId(), user.getName()))
                .collect(Collectors.toList());
    }
}
