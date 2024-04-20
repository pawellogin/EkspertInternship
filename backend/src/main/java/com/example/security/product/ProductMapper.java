package com.example.security.product;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private ModelMapper modelMapper;

    @Autowired
    public ProductMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ProductDto mapFromEntityToDto(ProductEntity productEntity){
        return modelMapper.map(productEntity,ProductDto.class);
    }

    public ProductEntity mapToEntityFromDto(ProductDto productDto){
        return modelMapper.map(productDto, ProductEntity.class);
    }
}
