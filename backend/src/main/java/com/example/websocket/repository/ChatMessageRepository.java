package com.example.websocket.repository;

import com.example.websocket.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimestampAsc(Long senderId1, Long receiverId1, Long senderId2, Long receiverId2);
}
