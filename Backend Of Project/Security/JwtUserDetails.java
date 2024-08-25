package com.local.onlineshoppingproject.Security;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Services.CustomerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class JwtUserDetails implements UserDetails {

    private final Integer id;
    private final String username;
    private final String password;
    private final String role;


    private JwtUserDetails(Integer id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public static JwtUserDetails create(Integer id, String username, String password, String role) {
        return new JwtUserDetails(id, username, password, role);
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        System.out.println("Rol: " + role);
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Integer getId() {
        return id;
    }
}