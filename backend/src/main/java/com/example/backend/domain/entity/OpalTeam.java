package com.example.backend.domain.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "opal_team")
public class OpalTeam {
    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("kerberos")
    private String kerberos;

    @Field("email")
    private String email;
}
/*

    public record OpalTeam(@Id String id, String name, String kerberos, String email) {}
    
    above line of code also creates a record class with the same fields and Lombok annotations
    but using a record is more concise and modern in Java, especially for immutable data structures

    Disadvantage of using a record is that its getter are names as variable naems only and don't include "get" prefix.
    For example, to access the name field, you would use team.name instead of team.getName().
    Moreover, records are immutable by default, meaning you cannot change the values of the fields after the object is created.
    Moreover, records do not support inheritance, so you cannot extend a record class.
    Moreover, records don't support annotations like @Data, @NoArgsConstructor, and @AllArgsConstructor directly.
    Moreover, records don't have a default constructor and no setter methods are generated.

*/