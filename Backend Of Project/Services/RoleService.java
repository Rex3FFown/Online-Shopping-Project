package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Role;
import com.local.onlineshoppingproject.Repositories.RoleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//@RequiredArgsConstructor
@Service
public class RoleService {
    private final RoleRepo roleRepo;
    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }
    public Role getRole(int id) {
    return roleRepo.findById(id).get();}
}