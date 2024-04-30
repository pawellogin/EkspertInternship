package com.example.security.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    Page<User> findAll(Pageable pageable);

    List<User> findAll();

    Optional<User> findOne(Long id);

    Optional<User> findByUsername(String username);

    User save(User user);

    void deleteUser(Long id);
}
