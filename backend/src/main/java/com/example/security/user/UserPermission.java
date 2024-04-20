package com.example.security.user;

public enum UserPermission {
    USER_READ("user:read"),
    USER_WRITE("user:write"),
    PRODUCT_READ("product:read"),
    PRODUCT_WRITE("product:write"),
    ;

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
