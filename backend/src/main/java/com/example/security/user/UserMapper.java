package com.example.security.user;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private ModelMapper modelMapper;

    @Autowired
    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDto mapFromEntityToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public User mapToEntityFromDto(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
}
