package com.example.security.authentication;

import com.example.security.config.JwtService;
import com.example.security.user.UserRole;
import com.example.security.user.User;
import com.example.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = new User(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                UserRole.USER,
                request.getFirstName(),
                request.getLastName()
        );
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        Set<GrantedAuthority> authoritiesSet = new HashSet<>(savedUser.getAuthorities());
        return new AuthenticationResponse(jwtToken, savedUser.getUsername(), authoritiesSet);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        System.out.println("Starting authentication process for user: " + request.getUsername());
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            System.out.println("Authentication successful for user: " + request.getUsername());

            var user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(()-> new UsernameNotFoundException("User not found: " + request.getUsername()));

            System.out.println("User retrieved: " + user.getUsername());

            var jwtToken = jwtService.generateToken(user);
            System.out.println("JWT token generated successfully for user: " + user.getUsername());

            Set<GrantedAuthority> rolesSet = user.getRoles();

            return new AuthenticationResponse(jwtToken, user.getUsername(), rolesSet);
        }catch (AuthenticationException e){
            System.out.println("Authentication failed for user: " + request.getUsername());
            e.printStackTrace();
            return null;
        }
    }

    public boolean isUsernameTaken(RegisterRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        return userOptional.isPresent();
    }
}
