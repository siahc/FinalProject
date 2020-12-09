package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;

public interface ProviderService {
	
	List<Provider> getAllProviders();
	
	Provider findById(int id);
	
	Provider createProvider(Provider provider);
	
	Provider updateProvider(int id, Provider provider);

	Provider getProviderByUsername(String username);
	List<Patient> getProviderPatientsByUsername(String username);
	Boolean removePatient(int id, String username);

	Boolean addPatientToProvider(int id, String username);
	
	
}
