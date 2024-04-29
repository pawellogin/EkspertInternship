package com.example.security.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.reactive.context.StandardReactiveWebEnvironment;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


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

    public List<CartEntity> findAll() {
        return StreamSupport.stream(
                cartRepository.findAll().spliterator()
                ,false)
                .collect(Collectors.toList());
    }

    public Optional<CartEntity> findOne(long id) {
        return cartRepository.findById(id);
    }

    public List<CartEntity> findAllByUserId(Long userId) {
        return cartRepository.findAllByUserId(userId);
    }

    public Optional<CartEntity> findOneByUserId(Long id, Long userId) {
        return cartRepository.findByIdAndUserId(id, userId);
    }


    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}
