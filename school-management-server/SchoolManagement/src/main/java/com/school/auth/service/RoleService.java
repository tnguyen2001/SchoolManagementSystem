package com.school.auth.service;

import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.school.auth.entity.Role;
import com.school.auth.repository.RoleRepository;
import com.school.constant.ErrorMessage;
import com.school.exception.BadRequestException;
import com.school.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

	private final RoleRepository roleRepository;

	public Role create(Role rqRole) {
		if (roleRepository.existsByName(rqRole.getName())) {
			throw new BadRequestException(ErrorMessage.ROLE_EXISTED.getValue());
		}
		if (StringUtils.isEmpty(rqRole.getName())) {
			throw new BadRequestException(ErrorMessage.ROLE_REQUIRED.getValue());
		}

		return this.roleRepository.save(rqRole);
	}

	public Role findByName(String name) {
		Optional<Role> dbRole = this.roleRepository.findByName(name);

		if (dbRole.isPresent()) {
			return dbRole.get();
		}

		throw new NotFoundException(ErrorMessage.ROLE_NOT_EXIST.getValue());
	}

}
