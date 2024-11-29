package com.school.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String confirmPassword;
	private String phone;
	
}
