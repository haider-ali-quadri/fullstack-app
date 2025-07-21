package com.example.backend.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;

@Service
public class AiService {
    String apiUrl = "https://api.openai.com/v1/chat/completions";
    String apiKey = "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";
    String httpRequest = """
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": "%s"}],
                "max_tokens": 100
            }
            """;

    public String askOpenAI(String prompt) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(httpRequest.formatted(prompt, prompt)))
                .build();
        HttpResponse<String> resp = null;
        try {
            resp = client.send(req, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
        return resp.body();
    }
}