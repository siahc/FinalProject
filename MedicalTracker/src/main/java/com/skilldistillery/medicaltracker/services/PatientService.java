package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;

public interface PatientService {

	Patient update(Patient patient, Integer id);

	Patient createPatient(Patient patient, User user);

	void addProviderToPatient(Provider provider, Integer patId);

	Patient showPat(int patId);

	List<Medication> listMeds(Integer patId);
	List<MedicalHistory> listMedHist(Integer patId);

	List<Patient> showAllPatients();

}
