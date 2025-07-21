package com.example.backend.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.AiService;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/generate")
    public String generate(@RequestParam String prompt) {
        return aiService.askOpenAI(prompt);
    }

    @GetMapping("/test")
    public String test() {
        return "AI Service is running!";
    }
}
