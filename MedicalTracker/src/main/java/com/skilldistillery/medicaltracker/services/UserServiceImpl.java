package com.skilldistillery.medicaltracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public List<User> getAllUsers(){
		return userRepo.findAll();
	}

	@Override
	public User findById(int id) {
		Optional<User> userOpt = userRepo.findById(id);
		if (userOpt.isPresent()) {
			return userOpt.get();
		}
		return null;
	}

	@Override
	public User createUser(User user) {
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User updateUser(int id, User user) {
		User u = this.findById(id);
		if (u == null) {
			return null;
		}
		if (user.getUsername() != null) {
			u.setUsername(user.getUsername());
		} 
		if (user.getPassword() != null) {
			u.setPassword(user.getPassword());
		}
		if(user.getProvider() != null) {
			u.setProvider(user.getProvider());
		}
		if(user.getRole() != null) {
			u.setRole(user.getRole());
		}
		if(user.getEnabled() != null ) {
			u.setEnabled(user.getEnabled());
		}
		
		
		return userRepo.saveAndFlush(u);
	}

	@Override
	public Patient getUserPatient(String username) {
		User u = userRepo.findUniqueByUsername(username);
		return u.getPatient();
	}
	@Override
	public List<Medication> getUserPatientMeds(String username) {
		User u = userRepo.findUniqueByUsername(username);
		return u.getPatient().getMedications();
	}
	@Override
	public List<MedicalHistory> getUserPatientMedHis(String username) {
		User u = userRepo.findUniqueByUsername(username);
		return u.getPatient().getMedHis();
	}
	@Override
	public User getUserByUsername(String username) {
		User u = userRepo.findUniqueByUsername(username);
		return u;
	}
	
	
	

}
