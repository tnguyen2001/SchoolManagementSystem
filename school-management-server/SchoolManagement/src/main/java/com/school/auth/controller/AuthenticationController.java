package com.school.auth.controller;

import java.io.IOException;
import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.school.auth.dto.ChangePasswordRequestDTO;
import com.school.auth.dto.LoginRequestDTO;
import com.school.auth.dto.LoginResponseDTO;
import com.school.auth.dto.RegisterRequestDTO;
import com.school.auth.dto.RegisterResponseDTO;
import com.school.auth.service.AuthenticationService;
import com.school.auth.service.TokenService;
import com.school.auth.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;
	private final UserService userService;
	private final TokenService tokenService;

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.OK)
	public RegisterResponseDTO register(@RequestBody RegisterRequestDTO request) {
		return authenticationService.register(request);
	}

	@PostMapping("/login")
	@ResponseStatus(HttpStatus.OK)
	public LoginResponseDTO logIn(@RequestBody LoginRequestDTO request) {
		return authenticationService.logIn(request);
	}

	@PostMapping("/refresh-token")
	@ResponseStatus(HttpStatus.OK)
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		tokenService.refreshToken(request, response);
	}

	@PatchMapping
	@ResponseStatus(HttpStatus.OK)
	public void changePassword(@RequestBody ChangePasswordRequestDTO request, Principal connectedUser) {
		userService.changePassword(request, connectedUser);
	}

}
