package com.example.websocket.service;

import com.example.websocket.model.Swipe;
import com.example.websocket.model.User;
import com.example.websocket.model.UserDTO;
import com.example.websocket.repository.SwipeRepository;
import com.example.websocket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SwipeRepository swipeRepository;

    public User register(User user) {
        Optional<User> userExists = userRepository.findByEmail(user.getEmail());
        if (userExists.isPresent()) {
            throw new IllegalStateException("User with current email already exists!");
        }
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    public List<UserDTO> getAllMatchedUsers(Long userId) {
        List<Swipe> swipeByUserIdAndSwipeStatus = swipeRepository.findByUserIdAndSwipeStatus(userId, true);
        return swipeByUserIdAndSwipeStatus.stream()
                .map(swipe -> userRepository.findById(swipe.getPartnerId()))
                .filter(Optional::isPresent)
                .map(Optional::get).map(UserDTO::new).toList();
    }
}
