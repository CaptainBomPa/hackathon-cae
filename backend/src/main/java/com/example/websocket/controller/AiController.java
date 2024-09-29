package com.example.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
public class AiController {
    private final RestClient customClient;


    public AiController(@Value("${aiUrl}") String aiUrl) {
        customClient = RestClient.builder()
                .requestFactory(new HttpComponentsClientHttpRequestFactory())
                .baseUrl(aiUrl)
                .build();
    }

    @GetMapping("/recommendations/ngo/companies")
    public String getNgoCompanies(@RequestParam("id") Long id) {
        return customClient.get()
                .uri("/recommendations/ngo/companies?id={id}", id)
                .retrieve()
                .body(String.class);
    }
    @GetMapping("/recommendations/ngo/volunteers")
    public String getNgoVolunteers(@RequestParam("id") Long id) {
        return customClient.get()
                .uri("/recommendations/ngo/volunteers?id={id}", id)
                .retrieve()
                .body(String.class);
    }
    @GetMapping("/recommendations/company")
    public String getCompany(@RequestParam("id") Long id) {
        return customClient.get()
                .uri("/recommendations/company?id={id}", id)
                .retrieve()
                .body(String.class);
    }
    @GetMapping("/recommendations/volunteer")
    public String getVolunteer(@RequestParam("id") Long id) {
        return customClient.get()
                .uri("/recommendations/company?id={id}", id)
                .retrieve()
                .body(String.class);
    }
}
