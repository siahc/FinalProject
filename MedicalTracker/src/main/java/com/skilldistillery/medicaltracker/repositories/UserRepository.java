package com.skilldistillery.medicaltracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.medicaltracker.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findUniqueByUsername(String username);
}
