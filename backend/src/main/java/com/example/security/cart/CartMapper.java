package com.example.security.cart;

import com.example.security.product.ProductDto;
import com.example.security.product.ProductEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
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
        return modelMapper.map(cartEntity,CartDto.class);
    }

    public CartEntity mapToEntityFromDto(CartDto cartDto){
        return modelMapper.map(cartDto, CartEntity.class);
    }
}
