package com.example.websocket.repository;

import com.example.websocket.model.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwipeRepository extends JpaRepository<Swipe, Long> {
    public List<Swipe> findByUserIdAndSwipeStatus(Long userId, boolean swipeStatus);
}
