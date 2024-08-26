package com.local.onlineshoppingproject.Entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ma_authority")
@Data
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String surname;
    String password;
    String username;
    int role_level;
}
