package com.school.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ErrorMessage {
	
	EMAIL_EXISTED("Email is already taken!"),
	USERNAME_PW_REQUIRED("Username and password are required!"),
	EMAIl_NOT_EXIST("Email does not exist!"),
	
	ROLE_EXISTED("Role is already taken!"),
	ROLE_REQUIRED("Role name is required!"),
	ROLE_NOT_EXIST("Role does not exist!"),

	;

	@Getter
	private final String permission;
	
	public String getValue() {
		return permission;
	}
	
}
