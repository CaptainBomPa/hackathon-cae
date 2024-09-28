package com.example.websocket.init;

import com.example.websocket.model.*;
import com.example.websocket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public final class DatabaseInitializer implements CommandLineRunner {
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        for (int i = 1; i <= 3; i++) {
            User biz = new BizUser();
            biz.setName("Biz User" + i);
            biz.setEmail("biz" + i + "@example.com");
            biz.setPassword("biz");
            biz.setRole(Role.BIZ);

            User ngo = new NgoUser();
            ngo.setName("Ngo User" + i);
            ngo.setEmail("ngo" + i + "@example.com");
            ngo.setPassword("ngo");
            ngo.setRole(Role.NGO);

            User vol = new VolunteerUser();
            vol.setName("vol User" + i);
            vol.setEmail("vol" + i + "@example.com");
            vol.setPassword("vol");
            vol.setRole(Role.VOLUNTEER);

            userRepository.save(biz);
            userRepository.save(ngo);
            userRepository.save(vol);
        }
    }
}
