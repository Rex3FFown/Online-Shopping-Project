package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {

}
