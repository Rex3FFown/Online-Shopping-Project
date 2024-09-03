package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Repositories.CustomerRepo;
import com.local.onlineshoppingproject.Security.JwtUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor

public class UserDetailsServiceImpl implements UserDetailsService {

    private final CustomerService service;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        return new JwtUserDetails(service.getCustomerByMail(mail));
    }
}