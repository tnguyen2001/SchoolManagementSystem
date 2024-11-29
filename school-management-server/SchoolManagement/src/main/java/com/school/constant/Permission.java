package com.school.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_VIEW("admin:view"),
    ADMIN_EDIT("admin:edit"),
    MANAGER_VIEW("management:view"),
    MANAGER_EDIT("management:edit"),
    ;

    @Getter
    private final String permission;
}
