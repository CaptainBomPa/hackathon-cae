package com.example.websocket.controller;

import com.example.websocket.model.Swipe;
import com.example.websocket.service.SwipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/swipe")
@RequiredArgsConstructor
public class SwipeController {
    private final SwipeService swipeService;

    @PostMapping
    public Swipe saveMatch(@RequestBody Swipe swipe) {
        return swipeService.saveMatch(swipe);
    }
}
