package com.example.security.user;

import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    Page<User> findAll(Pageable pageable);

    List<User> findAll();

}
