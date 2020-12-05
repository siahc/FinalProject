package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.User;

public interface UserService {

	List<User> getAllUsers();
	
	User findById(int id);

	User createUser(User user);
	
	User updateUser (int id, User user);
	
	
	
}
