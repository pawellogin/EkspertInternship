package com.example.security.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





@Service
public class CartService {
    private CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public CartEntity save(CartEntity cartEntity){
        return cartRepository.save(cartEntity);
    }

    public CartEntity saveOrUpdate(CartEntity cartEntity){
        CartEntity cartEntityToFind = cartRepository.findByUserIdAndProductId(
                cartEntity.getUserId(),
                cartEntity.getProductId()
        );

        if(cartEntityToFind != null){
            Long productAmount = cartEntityToFind.getProductAmount() + cartEntity.getProductAmount();
            cartEntityToFind.setProductAmount(productAmount);
            return cartRepository.save(cartEntityToFind);
        } else{
            return cartRepository.save(cartEntity);
        }
    }







}
