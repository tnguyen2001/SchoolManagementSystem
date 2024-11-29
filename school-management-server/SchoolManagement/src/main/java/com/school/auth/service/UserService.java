package com.school.auth.service;

import static com.school.utils.UtilFunction.isNE;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school.auth.dto.ChangePasswordRequestDTO;
import com.school.auth.dto.RegisterRequestDTO;
import com.school.auth.entity.Role;
import com.school.auth.entity.User;
import com.school.auth.repository.UserRepository;
import com.school.constant.ErrorMessage;
import com.school.exception.BadRequestException;
import com.school.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final RoleService roleService;

	public List<User> getAllUsers(String email) {
		List<User> users = null;
		if (StringUtils.isNoneEmpty(email)) {
			// users = this.repository.findByEmailContaining(email);
		} else {
			users = this.userRepository.findAll();
		}

		if (users.isEmpty()) {
			// throw new NotFoundException("No user exist!");
		}

		return users;
	}

	public User create(RegisterRequestDTO requestUser) {
		if (userRepository.existsByEmail(requestUser.getEmail())) {
			throw new BadRequestException(ErrorMessage.EMAIL_EXISTED.getValue());
		}
		if (StringUtils.isEmpty(requestUser.getEmail()) || StringUtils.isEmpty(requestUser.getPassword())) {
			throw new BadRequestException(ErrorMessage.USERNAME_PW_REQUIRED.getValue());
		}
		if (isNE(requestUser.getPassword(), requestUser.getConfirmPassword())) {
			throw new BadRequestException("Password and confirmation password do not match!");
		}

		Role role = this.roleService.findByName("USER");

		User user = User.builder()
						.firstName(requestUser.getFirstName())
						.lastName(requestUser.getLastName())
						.email(requestUser.getEmail())
						.phone(requestUser.getPhone())
						.password(passwordEncoder.encode(requestUser.getPassword()))
						.confirmPassword(passwordEncoder.encode(requestUser.getConfirmPassword()))
						.roles(new ArrayList<>()).build();
		user.addRole(role);

		return this.userRepository.save(user);

	}

	public User findByEmail(String email) {
		Optional<User> dbUser = this.userRepository.findByEmail(email);

		if (dbUser.isPresent()) {
			return dbUser.get();
		}

		throw new NotFoundException(ErrorMessage.EMAIl_NOT_EXIST.getValue());
	}
	
    public void changePassword(ChangePasswordRequestDTO request, Principal connectedUser) {
		User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

		if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
			throw new BadRequestException("Wrong password!");
		}
		if (isNE(request.getNewPassword(), request.getConfirmationPassword())) {
			throw new BadRequestException("Password are not the same!");
		}

		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return this.findByEmail(username);
	}
    
}
