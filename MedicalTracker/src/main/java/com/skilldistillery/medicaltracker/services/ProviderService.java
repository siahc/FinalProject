package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.Provider;

public interface ProviderService {
	
	List<Provider> getAllProviders();
	
	Provider findById(int id);
	
	Provider createProvider(Provider provider);
	
	Provider updateProvider(int id, Provider provider);
	
}
