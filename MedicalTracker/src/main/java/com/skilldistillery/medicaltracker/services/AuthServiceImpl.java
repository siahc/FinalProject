package com.skilldistillery.medicaltracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.repositories.UserRepository;
@Service
public class AuthServiceImpl implements AuthService {
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setEnabled(true);
		user.setRole("patient");
		return userRepo.saveAndFlush(user);
	}
	
	@Override
	public User updateUser(User user, String username) {
		User dbUser = userRepo.findUniqueByUsername(username);
		if(user.getPassword() != null) {dbUser.setPassword(encoder.encode(user.getPassword()));}
		if(user.getUsername() != null) {dbUser.setUsername(user.getUsername());}
		if(user.getEnabled() != null) {dbUser.setEnabled(user.getEnabled());}
		return userRepo.saveAndFlush(dbUser);
	}

	@Override
	public User getUser(String username) {
		return userRepo.findUniqueByUsername(username);
	}


}
