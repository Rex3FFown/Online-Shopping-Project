package com.local.onlineshoppingproject.Security;


import ch.qos.logback.core.util.StringUtil;
import com.local.onlineshoppingproject.Services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
@Component
public class JwsAuthenticationFilter extends OncePerRequestFilter {


    private final JwtTokenProvider jwtTokenProvider;


    private final UserDetailsService userDetailsService;

    //private final TokenService tokenService;


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // ACCESS TOKEN VARIABLE
        final String jwtToken;

        // GET HEADER FROM REQUEST
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        // CHECK HEADER IS NULL OR NOT
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // EXTRACT TOKEN FROM HEADER
        jwtToken = authHeader.substring(7);


        String username;
        username = jwtTokenProvider.getUserIdFromToken(jwtToken);
        System.out.println(username);

//        try {
//            decodedJWT = tokenService.verifyAccessToken(jwtToken);
//            username = decodedJWT.getSubject();
//        } catch (Exception e) {
//            sendError(response, new Exception("Access Token is Not Valid!"),request);
//            return;
//        }

        if (username == null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);


        // GENERATE NEW AUTH TOKEN
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        // SET CREATED TOKEN TO SECURITY CONTEXT
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // SET DETAILS
        //authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // FILTER AGAIN
        filterChain.doFilter(request, response);
    }
}
//@Override
//protected void doFilterInternal(
//        @NonNull HttpServletRequest request,
//        @NonNull HttpServletResponse response,
//        @NonNull FilterChain filterChain) throws ServletException, IOException {
//
//    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//        filterChain.doFilter(request, response);
//        return;
//    }
//
//    String jwtToken = authHeader.substring(7);
//    String username = jwtTokenProvider.getUserIdFromToken(jwtToken);
//    String role = jwtTokenProvider.getRoleFromToken(jwtToken);
//
//    if (username == null) {
//        filterChain.doFilter(request, response);
//        return;
//    }
//
//    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//    if (jwtTokenProvider.validateToken(jwtToken)) {
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                userDetails, null, Collections.singletonList(new SimpleGrantedAuthority(role))
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//    }
//
//    filterChain.doFilter(request, response);
//}