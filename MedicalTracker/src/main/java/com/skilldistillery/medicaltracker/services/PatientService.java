package com.skilldistillery.medicaltracker.services;

import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;

public interface PatientService {

	Patient update(Patient patient, Integer id);

	Patient createPatient(Patient patient, User user);

	void addProviderToPatient(Provider provider, Integer patId);

}
