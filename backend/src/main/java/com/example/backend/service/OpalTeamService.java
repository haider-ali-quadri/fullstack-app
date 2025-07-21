package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.domain.entity.OpalTeam;
import com.example.backend.domain.repository.OpalTeamRepository;

@Service
public class OpalTeamService {
    private final OpalTeamRepository opalTeamRepository;

    public OpalTeamService(OpalTeamRepository opalTeamRepository) {
        this.opalTeamRepository = opalTeamRepository;
    }

    public List<OpalTeam> getAll() {
        return opalTeamRepository.findAll();
    }

    public OpalTeam getById(String id) {
        return opalTeamRepository.findById(id).orElse(null);
    }

    public OpalTeam getByKerberos(String kerberos) {
        return opalTeamRepository.findByKerberos(kerberos).orElse(null);
    }

    public OpalTeam save(OpalTeam teamMember) {
        return opalTeamRepository.save(teamMember);
    }

    public OpalTeam update(String id, OpalTeam teamMember) {
        return opalTeamRepository.findById(id)
            .map(existingTeam -> {
                existingTeam.setName(teamMember.getName());
                existingTeam.setKerberos(teamMember.getKerberos());
                existingTeam.setEmail(teamMember.getEmail());
                return opalTeamRepository.save(existingTeam);
            })
            .orElseThrow(() -> new RuntimeException("Team member not found with id: " + id));
    }

    public void delete(String id) {
        opalTeamRepository.deleteById(id);
    }
}
