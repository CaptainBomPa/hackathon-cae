package com.example.websocket.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/send")
    public ChatMessage sendMessage(ChatMessage message) {
        chatMessageService.saveMessage(message);
        // Wysłanie wiadomości do konkretnego użytkownika
        messagingTemplate.convertAndSendToUser(
                message.getReceiverId().toString(), // ID odbiorcy
                "/messages", // Temat
                message // Przesyłana wiadomość
        );

        return message;
    }

    @GetMapping("/messages")
    public List<ChatMessage> getMessages(@RequestParam Long senderId, @RequestParam Long receiverId) {
        return chatMessageService.getMessages(senderId, receiverId);
    }
}
