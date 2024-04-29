package com.example.security.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/")
public class CartController {

    private CartService cartService;

    private CartMapper cartMapper;

    @Autowired
    public CartController(CartService cartService, CartMapper cartMapper) {
        this.cartService = cartService;
        this.cartMapper = cartMapper;
    }


    @PostMapping("carts")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CartDto> createCart(@RequestBody CartDto cartDto) {
        CartEntity cartEntity = cartMapper.mapToEntityFromDto(cartDto);
        CartEntity savedCartEntity = cartService.save(cartEntity);
        return new ResponseEntity<>(cartMapper.mapFromEntityToDto(savedCartEntity), HttpStatus.CREATED);
    }
}
