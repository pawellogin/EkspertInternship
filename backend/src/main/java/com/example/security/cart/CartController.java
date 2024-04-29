package com.example.security.cart;

import com.example.security.product.ProductDto;
import com.example.security.user.User;
import com.example.security.user.UserService;
import com.example.security.user.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/")
public class CartController {

    private CartService cartService;

    private CartMapper cartMapper;

    private UserServiceImpl userService;

    @Autowired
    public CartController(CartService cartService, CartMapper cartMapper, UserServiceImpl userService) {
        this.cartService = cartService;
        this.cartMapper = cartMapper;
        this.userService = userService;
    }


    @PostMapping("carts")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CartDto> createCart(@RequestBody CartDto cartDto) {
        CartEntity cartEntity = cartMapper.mapToEntityFromDto(cartDto);
        CartEntity savedCartEntity = cartService.saveOrUpdate(cartEntity);
        return new ResponseEntity<>(cartMapper.mapFromEntityToDto(savedCartEntity), HttpStatus.CREATED);
    }

    @GetMapping("carts")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<CartDto>> getCartsByUserId(Authentication auth) {
        String currentUserUsername = auth.getName();

        Optional<User> currentUser = userService.findByUsername(currentUserUsername);

        if(currentUser.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Long userId = currentUser.get().getId();

            List<CartEntity> foundCarts = cartService.findAllByUserId(userId);

            if(foundCarts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                List<CartDto> cartsDto = foundCarts.stream()
                        .map(cartMapper::mapFromEntityToDto)
                        .collect(Collectors.toList());
                return new ResponseEntity<>(cartsDto, HttpStatus.OK);
            }
        }
    }

    @GetMapping("carts/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CartDto> getCartByUserId(@PathVariable("id") Long id, Authentication auth) {
        String currentUserUsername = auth.getName();

        Optional<User> currentUser = userService.findByUsername(currentUserUsername);

        if (currentUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Long userId = currentUser.get().getId();

            Optional<CartEntity> foundCart = cartService.findOneByUserId(id, userId);
            if (foundCart.isPresent()) {
                CartDto cartDto = cartMapper.mapFromEntityToDto(foundCart.get());
                return new ResponseEntity<>(cartDto, HttpStatus.FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }
}
