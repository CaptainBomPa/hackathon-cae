package com.example.websocket.service;

import com.example.websocket.model.Swipe;
import com.example.websocket.repository.SwipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SwipeService {
    private final SwipeRepository swipeRepository;

    public Swipe saveMatch(Swipe swipe) {
        return swipeRepository.save(swipe);
    }
}
