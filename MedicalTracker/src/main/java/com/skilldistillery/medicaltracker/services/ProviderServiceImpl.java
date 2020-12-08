package com.skilldistillery.medicaltracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.repositories.ProviderRepository;
import com.skilldistillery.medicaltracker.repositories.UserRepository;

@Service
public class ProviderServiceImpl implements ProviderService {

	@Autowired
	private ProviderRepository providerRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public List<Provider> getAllProviders() {
		return providerRepo.findAll();
	}

	@Override
	public Provider findById(int id) {
		Optional<Provider> provOpt = providerRepo.findById(id);
		if(provOpt.isPresent()) {
			return provOpt.get();
		}
		return null;
	}

	@Override
	public Provider createProvider(Provider provider) {
		return providerRepo.saveAndFlush(provider);
	}

	@Override
	public Provider updateProvider(int id, Provider provider) {
		Provider p = this.findById(id);
		if (p == null) {
			return null;
		}
		if (provider.getFname() != null) {
			p.setFname(provider.getFname());
		}
		if(provider.getLname() != null) {
			p.setLname(provider.getLname());
		}
		if(provider.getLocation() != null) {
			p.setLocation(provider.getLocation());
		}
		if(provider.getTitle() != null) {
			p.setTitle(provider.getTitle());
		}
		if(provider.getUser() != null) {
			p.setUser(provider.getUser());
		}
		if(provider.getPatients() != null) {
			p.setPatients(provider.getPatients());
		}
		if(provider.getMessages() != null) {
			p.setMessages(provider.getMessages());
		}
		
		return providerRepo.saveAndFlush(p);
	}
	
	@Override
	public Provider getProviderByUsername(String username) {
		User u = userRepo.findUniqueByUsername(username);
		return u.getProvider();
	}

	@Override
	public List<Patient> getProviderPatientsByUsername(String username) {
		User u = userRepo.findUniqueByUsername(username);
		return u.getProvider().getPatients();
	}
	

}
