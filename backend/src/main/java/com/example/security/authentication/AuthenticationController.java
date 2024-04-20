package com.example.security.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    @Autowired
    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/register")
//    @PreAuthorize("hasAuthority('product:read')")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        if (service.isUsernameTaken(request)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {

        AuthenticationResponse response = service.authenticate(request);
        if (response != null) {
            return ResponseEntity.ok(service.authenticate(request));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

//    @PostMapping("/test")
//    public ResponseEntity test(
//            @RequestBody AuthenticationRequest request
//    ){
//        System.out.println("test endpoint");
//        System.out.println("Request get method:");
//        System.out.println(request.getUsername());
//        System.out.println(request.getPassword());
//        System.out.println("Service authenticate token");
//        System.out.println(service.authenticate(request).getToken());
//
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
}
