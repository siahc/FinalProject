package com.skilldistillery.medicaltracker.services;

import com.skilldistillery.medicaltracker.entities.User;

public interface AuthService {
	public User register(User user);
	public User getUser(String username);
}
