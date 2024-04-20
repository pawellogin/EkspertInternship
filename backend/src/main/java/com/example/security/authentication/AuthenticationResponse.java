package com.example.security.authentication;

import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Set;

public class AuthenticationResponse {
    private String token;
    private String username;
    private Set<GrantedAuthority> authorities;

    public AuthenticationResponse(String token, String username, Set<GrantedAuthority> authorities) {
        this.token = token;
        this.username = username;
        this.authorities = authorities;
    }

    public AuthenticationResponse(){
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
