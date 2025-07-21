package com.example.backend.domain.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.domain.entity.OpalTeam;

@Repository
public interface OpalTeamRepository extends MongoRepository<OpalTeam, String>{
    public Optional<OpalTeam> findByKerberos(String kerberos);
}
