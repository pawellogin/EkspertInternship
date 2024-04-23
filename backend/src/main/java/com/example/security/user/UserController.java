package com.example.security.user;


import com.example.security.product.ProductEntity;
import com.example.security.user.UserService;
import com.example.security.user.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class UserController {

    private UserServiceImpl userService;
    private UserMapper userMapper;

    @Autowired
    public UserController(UserServiceImpl userService, UserMapper userMapper) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('user:read')")
    public Page<UserDto> getUsers(Pageable pageable){
        Page<User> userPage = userService.findAll(pageable);
//        return userPage;
        return userPage.map(userMapper::mapFromEntityToDto);
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long id){
        Optional<User> foundUser = userService.findOne(id);

        if(foundUser.isPresent()){
            UserDto userDto = userMapper.mapFromEntityToDto(foundUser.get());
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


}
