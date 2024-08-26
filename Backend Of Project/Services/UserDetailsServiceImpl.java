package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Repositories.CustomerRepo;
import com.local.onlineshoppingproject.Security.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final CustomerRepo customerRepo;

    public UserDetailsServiceImpl(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return JwtUserDetails.create(customer.getId(), customer.getEmail(), customer.getPassword(), customer.getRole().name());
    }

    public UserDetails loadUserById(int id) throws UsernameNotFoundException {
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        return JwtUserDetails.create(customer.getId(), customer.getEmail(), customer.getPassword(), customer.getRole().name());
    }
}


