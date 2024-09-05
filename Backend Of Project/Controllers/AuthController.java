package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Entities.Role;
import com.local.onlineshoppingproject.Requests.AuthRequest;
import com.local.onlineshoppingproject.Requests.CustomerRequest;
import com.local.onlineshoppingproject.Responses.AuthResponse;
import com.local.onlineshoppingproject.Security.JwtTokenProvider;
import com.local.onlineshoppingproject.Services.CustomerService;
import com.local.onlineshoppingproject.Services.RefreshTokenService;
import com.local.onlineshoppingproject.Services.RoleService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomerService userService;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final CustomerService customerService;
    private final RoleService roleService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, CustomerService userService,
                          PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, RefreshTokenService refreshTokenService, CustomerService customerService, RoleService roleService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenService = refreshTokenService;
        this.customerService = customerService;
        this.roleService = roleService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody CustomerRequest loginRequest) {
        try {

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            Authentication auth = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(auth);

            String jwtToken = jwtTokenProvider.generateJwtToken(auth);


            Customer customer = userService.getCustomerByMail(loginRequest.getEmail());
            if (customer == null) {
                throw new UsernameNotFoundException("User not found with email: " + loginRequest.getEmail());
            }


            String refreshToken = refreshTokenService.createRefreshToken(customer);


            Integer userId = customer.getId();
            String userEmail = customer.getEmail();
            String userName=customer.getName();
            String userSurname = customer.getSurname();
            String userAddress = customer.getAddress();
            String role = jwtTokenProvider.getRoleFromToken(jwtToken);

            AuthResponse authResponse = new AuthResponse("Bearer " + jwtToken, userId, refreshToken, role,userName,userEmail,userSurname,userAddress);


            return ResponseEntity.ok(authResponse);

        } catch (BadCredentialsException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Invalid email or password", null, null, null,null,null,null,null));
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An error occurred: " + e.getMessage(), null, null, null,null,null,null,null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("User logged out successfully");
    }
   /* @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest loginRequest) {
        return ResponseEntity.ok().body(authService.login(loginRequest));
    } */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<AuthResponse> handleUsernameNotFound(UsernameNotFoundException e) {
        AuthResponse errorResponse = new AuthResponse(e.getMessage(), null, null, null,null,null,null,null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AuthResponse> handleBadCredentials(BadCredentialsException e) {
        AuthResponse errorResponse = new AuthResponse("Invalid email or password", null, null, null,null,null,null,null);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AuthResponse> handleGeneralException(Exception e) {
        AuthResponse errorResponse = new AuthResponse("An error occurred: " + e.getMessage(), null, null, null,null,null,null,null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}

