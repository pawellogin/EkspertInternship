package com.example.security.cart;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {
    private ModelMapper modelMapper;

    @Autowired
    public CartMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CartDto mapFromEntityToDto(CartEntity cartEntity){
        return modelMapper.map(cartEntity, CartDto.class);
    }

    public CartItem mapToCartItemFromDto(CartDto cartDto, String productName, byte[] productImage){
        CartItem cartItem = new CartItem();
        cartItem.setId(cartDto.getId());
        cartItem.setProductId(cartDto.getProductId());
        cartItem.setProductAmount(cartDto.getProductAmount());
        cartItem.setProductAmount(cartDto.getProductAmount());
        cartItem.setProductName(productName);
        cartItem.setProductImage(productImage);

        return cartItem;
    }

    public CartEntity mapToEntityFromDto(CartDto cartDto){
        return modelMapper.map(cartDto, CartEntity.class);
    }
}
