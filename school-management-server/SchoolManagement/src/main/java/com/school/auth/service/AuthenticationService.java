package com.school.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.school.auth.dto.LoginRequestDTO;
import com.school.auth.dto.LoginResponseDTO;
import com.school.auth.dto.RegisterRequestDTO;
import com.school.auth.dto.RegisterResponseDTO;
import com.school.auth.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final JwtService jwtService;
	private final UserService userService;
	private final TokenService tokenService;
	private final AuthenticationManager authenticationManager;

	public RegisterResponseDTO register(RegisterRequestDTO requestUser) {
		User savedUser = userService.create(requestUser);

		return RegisterResponseDTO.builder().firstName(savedUser.getFirstName()).lastName(savedUser.getLastName())
				.email(savedUser.getEmail()).phone(savedUser.getPhone()).roles(savedUser.getRoles()).build();
	}

	public LoginResponseDTO logIn(LoginRequestDTO request) {
		User dbUser = userService.findByEmail(request.getEmail());

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		String jwtToken = jwtService.generateToken(dbUser);
		jwtService.generateRefreshToken(dbUser);
		tokenService.revokeAllUserTokens(dbUser);
		tokenService.create(dbUser, jwtToken);
		return LoginResponseDTO.builder().firstName(dbUser.getFirstName()).lastName(dbUser.getLastName())
				.email(dbUser.getEmail()).phone(dbUser.getPhone()).roles(dbUser.getRoles()).accessToken(jwtToken)
				.build();
	}

}
