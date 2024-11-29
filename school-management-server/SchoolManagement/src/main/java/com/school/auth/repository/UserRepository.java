package com.school.auth.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.school.auth.entity.User;

import java.util.List;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

  @RestResource(path = "findByName")
  List<User> findByLastNameContainingOrFirstNameContaining(String lastname, String firstname);
  
  boolean existsByEmail(String email);
}
