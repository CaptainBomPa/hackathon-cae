package com.example.websocket.service;

import com.example.websocket.model.*;
import com.example.websocket.repository.SwipeRepository;
import com.example.websocket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public User addPhoto(Long userId, MultipartFile file) throws IOException {
        Optional<User> existingUserOpt = userRepository.findById(userId);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (file != null && !file.isEmpty()) {
                if (existingUser.getPhoto() == null) {
                    Photo photo = new Photo();
                    photo.setPhoto(file.getBytes());
                    existingUser.setPhoto(photo);
                } else {
                    existingUser.getPhoto().setPhoto(file.getBytes());
                }
            }

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }
    public byte[] getPhoto(Long userId) {
        Optional<User> existingUserOpt = userRepository.findById(userId);

        if (existingUserOpt.isPresent()) {
            var photo =  existingUserOpt.get().getPhoto();
            if (photo != null) {
                return photo.getPhoto();
            }
            return null;
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public User update(User user) {
        User savedUser = userRepository.findById(user.getId()).orElseThrow(() -> new IllegalStateException("User not found to add additional info."));
        if (savedUser instanceof BizUser repoUser) {
            BizUser incomingBizUser = (BizUser) user;
            repoUser.merge(incomingBizUser);
        } else if (savedUser instanceof NgoUser repoUser) {
            NgoUser incomingNgoUser = (NgoUser) user;
            repoUser.merge(incomingNgoUser);
        } else if (savedUser instanceof VolunteerUser repoUser) {
            VolunteerUser incomingVolUser = (VolunteerUser) user;
            repoUser.merge(incomingVolUser);
        }
        return userRepository.save(savedUser);
    }

    public List<User> getNgos() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.NGO)
                .toList();
    }

    public List<User> getCompanies() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.BUSINESS)
                .toList();
    }

    public List<User> getVolunteers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.VOLUNTEER)
                .toList();
    }
}
