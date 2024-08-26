package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Authority;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface AuthorityRepo extends JpaRepository<Authority, Integer> {

    Optional<Authority> findByUsername(String authority);
}
