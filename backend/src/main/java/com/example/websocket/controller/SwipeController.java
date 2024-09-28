package com.example.websocket.controller;

import com.example.websocket.repository.SwipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/swipe")
@RequiredArgsConstructor
public class SwipeController {
    private final SwipeRepository swipeRepository;
}
