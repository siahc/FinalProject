package com.skilldistillery.medicaltracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.services.UserService;

@RequestMapping("api")
@RestController
public class UserController {
	
	@Autowired
	private UserService userSvc;
	
//	@GetMapping("ping")
//	public String ping() {
//		return "pong!";
//	}
	
	@GetMapping("users")
	public List<User> getUsers(){
		return userSvc.getAllUsers();
	}
	
	@GetMapping("users/{id}")
	public User findUser(
		@PathVariable int id,
		HttpServletResponse response
		) {
		if(id < 1) {
			response.setStatus(400);
			return null;
		}
		
		User u = userSvc.findById(id);
		if (u == null) {
			response.setStatus(404);
		}
		return u;
	}
	
	@PostMapping("user")
	public User createUser(
			@RequestBody User user,
			HttpServletRequest request,
			HttpServletResponse response
		) {
		userSvc.createUser(user);
			
		if(user == null) {
			response.setStatus(400);
		}
		return user;
	}
	
	
	

}
