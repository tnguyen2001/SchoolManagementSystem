package com.school.auth.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.school.auth.dto.LoginResponseDTO;
import com.school.auth.entity.Token;
import com.school.auth.entity.User;
import com.school.auth.repository.TokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {
	
	private final TokenRepository tokenRepository;
	private final JwtService jwtService;
	private final UserService userService;
	
	public void create(User user, String jwtToken) {
		Token token = Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType("BEARER")
				.expired(false)
				.revoked(false)
				.build();
		tokenRepository.save(token);
	}

	public void revokeAllUserTokens(User user) {
		List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
		if (validUserTokens.isEmpty()) {
			return;
		}

		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);
		});
		
		tokenRepository.saveAll(validUserTokens);
	}
	
	public LoginResponseDTO refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userEmail;
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return null;
		}
		refreshToken = authHeader.substring(7);
		userEmail = this.jwtService.extractUsername(refreshToken);
		if (userEmail != null) {
			User user = this.userService.findByEmail(userEmail);
			if (jwtService.isTokenValid(refreshToken, user)) {
				revokeAllUserTokens(user);
				String accessToken = this.jwtService.generateToken(user);
				this.create(user, accessToken);
				return LoginResponseDTO.builder()
						.accessToken(accessToken)
						.refreshToken(refreshToken)
						.build();
				//AuthenticationResponseDTO authResponse = new AuthenticationResponseDTO(accessToken, refreshToken);
				//new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
			}
		}
		return null;
	}
	
}
