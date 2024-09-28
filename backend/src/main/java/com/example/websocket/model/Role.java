package com.example.websocket.model;

public enum Role {
    BUSINESS,
    NGO,
    VOLUNTEER;

    public static Role fromString(String roleString) {
        if (roleString != null) {
            try {
                return Role.valueOf(roleString.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("No enum constant for role: " + roleString);
            }
        }
        throw new IllegalArgumentException("Role string cannot be null");
    }
}
