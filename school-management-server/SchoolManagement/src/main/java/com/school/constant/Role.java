package com.school.constant;

import static com.school.constant.Permission.ADMIN_EDIT;
import static com.school.constant.Permission.ADMIN_VIEW;
import static com.school.constant.Permission.MANAGER_EDIT;
import static com.school.constant.Permission.MANAGER_VIEW;

import java.util.Collections;
import java.util.Set;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {

        USER(Collections.emptySet()),
        ADMIN(
                        Set.of(
                                        ADMIN_VIEW,
                                        ADMIN_EDIT,
                                        MANAGER_VIEW,
                                        MANAGER_EDIT)),
        MANAGER(
                        Set.of(
                                        MANAGER_VIEW,
                                        MANAGER_EDIT))

        ;

        @Getter
        private final Set<Permission> permissions;

}
