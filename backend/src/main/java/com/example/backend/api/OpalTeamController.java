package com.example.backend.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.domain.entity.OpalTeam;
import com.example.backend.service.OpalTeamService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/teams")
public class OpalTeamController {
    private final OpalTeamService opalTeamService;

    public OpalTeamController(OpalTeamService opalTeamService) {
        this.opalTeamService = opalTeamService;
    }

    @GetMapping("/{id}")
    public OpalTeam getById(@PathVariable String id) {
        return opalTeamService.getById(id);
    }

    @GetMapping("/all")
    public List<OpalTeam> getAll() {
        return opalTeamService.getAll();
    }

    @GetMapping
    public OpalTeam getByKerberos(@RequestParam String kerberos) {
        return opalTeamService.getByKerberos(kerberos);
    }

}
