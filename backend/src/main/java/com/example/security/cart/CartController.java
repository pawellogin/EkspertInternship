package com.example.security.cart;

import com.example.security.product.ProductEntity;
import com.example.security.product.impl.ProductServiceImpl;
import com.example.security.user.User;
import com.example.security.user.impl.UserServiceImpl;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/")
public class CartController {

    private CartService cartService;

    private CartMapper cartMapper;

    private UserServiceImpl userService;

    private ProductServiceImpl productService;

    @Autowired
    public CartController(
            CartService cartService,
            CartMapper cartMapper,
            UserServiceImpl userService,
            ProductServiceImpl productService
    ) {
        this.cartService = cartService;
        this.cartMapper = cartMapper;
        this.userService = userService;
        this.productService = productService;
    }

    @PostMapping("carts")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CartDto> createCart(@RequestBody CartDto cartDto, Authentication auth) {
        String currentUserUsername = auth.getName();

        Optional<User> currentUser = userService.findByUsername(currentUserUsername);

        if (currentUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Long userId = currentUser.get().getId();
        cartDto.setUserId(userId);

        CartEntity cartEntity = cartMapper.mapToEntityFromDto(cartDto);
        CartEntity savedCartEntity = cartService.saveOrUpdate(cartEntity);
        return new ResponseEntity<>(cartMapper.mapFromEntityToDto(savedCartEntity), HttpStatus.CREATED);
    }

    @GetMapping("carts/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CartItem> getOneCartItemByUserId(@PathVariable("id") Long id, Authentication auth) {
        String currentUserUsername = auth.getName();

        Optional<User> currentUser = userService.findByUsername(currentUserUsername);

        if (currentUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Long userId = currentUser.get().getId();

            Optional<CartEntity> foundCart = cartService.findOneByUserId(id, userId);
            if (foundCart.isPresent()) {
                CartDto cartDto = cartMapper.mapFromEntityToDto(foundCart.get());

                String productName;
                byte[] productImage;
                BigDecimal productPrice;

                Optional<ProductEntity> productEntity = productService.findOne(foundCart.get().getProductId());
                if (productEntity.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } else {
                    productName = productEntity.get().getName();
                    productImage = productEntity.get().getImage();
                    productPrice = productEntity.get().getPrice();
                }

                CartItem cartItem = cartMapper.mapToCartItemFromDto(cartDto, productName, productImage, productPrice);

                return new ResponseEntity<>(cartItem, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }

    @GetMapping("carts")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<CartItem>> getCartItemsByUserId(Authentication auth) {
        String currentUserUsername = auth.getName();

        Optional<User> currentUser = userService.findByUsername(currentUserUsername);

        if (currentUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Long userId = currentUser.get().getId();

            List<CartEntity> foundCartsEntities = cartService.findAllByUserId(userId);

            if (foundCartsEntities.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                List<CartDto> cartDtoList = foundCartsEntities.stream()
                        .map(cartMapper::mapFromEntityToDto)
                        .collect(Collectors.toList());

                List<CartItem> cartItemList = new ArrayList<>();

                for (CartDto cartDto : cartDtoList) {
                    Optional<ProductEntity> productEntity = productService.findOne(cartDto.getProductId());
                    if (productEntity.isPresent()) {
                        String productName = productEntity.get().getName();
                        byte[] productImage = productEntity.get().getImage();
                        BigDecimal productPrice = productEntity.get().getPrice();

                        CartItem cartItem = cartMapper.mapToCartItemFromDto(cartDto, productName, productImage, productPrice);
                        cartItemList.add(cartItem);
                    } else {
                        String productName = "NOT_FOUND";
                        byte[] productImage = new byte[0];
                        BigDecimal productPrice = null;

                        CartItem cartItem = cartMapper.mapToCartItemFromDto(cartDto, productName, productImage, productPrice);
                        cartItemList.add(cartItem);
                    }
                }
                return new ResponseEntity<>(cartItemList, HttpStatus.OK);
            }
        }
    }

    @DeleteMapping("carts/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteCartItem(@PathVariable("id") Long id) {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("carts/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CartDto> updateProductAmount(
            @PathVariable("id") Long id,
            @RequestBody CartDto cartDto,
            Authentication auth
    ){
        System.out.println(cartDto.getId());
        Optional<CartEntity> cartEntity = cartService.findOne(cartDto.getId());

        if(cartEntity.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String currentUserUsername = auth.getName();

        Optional<User> currentUser = userService.findByUsername(currentUserUsername);

        if(currentUser.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        //TODO check the security for put end point for cartController

        cartEntity.get().setProductAmount(cartDto.getProductAmount());

        CartEntity savedCartEntity = cartService.save(cartEntity.get());

        return new ResponseEntity<>(cartMapper.mapFromEntityToDto(savedCartEntity) , HttpStatus.OK);
    }


//    @GetMapping("carts")
//    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
//    public ResponseEntity<List<CartDto>> getCartsByUserId(Authentication auth) {
//        String currentUserUsername = auth.getName();
//
//        Optional<User> currentUser = userService.findByUsername(currentUserUsername);
//
//        if(currentUser.isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }else{
//            Long userId = currentUser.get().getId();
//
//            List<CartEntity> foundCarts = cartService.findAllByUserId(userId);
//
//            if(foundCarts.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }else {
//                List<CartDto> cartsDto = foundCarts.stream()
//                        .map(cartMapper::mapFromEntityToDto)
//                        .collect(Collectors.toList());
//                return new ResponseEntity<>(cartsDto, HttpStatus.OK);
//            }
//        }
//    }
//

}