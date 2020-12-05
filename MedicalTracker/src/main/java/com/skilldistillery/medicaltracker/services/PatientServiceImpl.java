package com.skilldistillery.medicaltracker.services;

import java.util.Optional;

import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.repositories.PatientRespository;

public class PatientServiceImpl implements PatientService {
	private PatientRespository patRepo; 

	@Override
	public Patient createPatient(Patient patient, User user) {
		Patient patToAdd = patient;
		patToAdd.setUser(user);
		patRepo.saveAndFlush(patToAdd);
		return patToAdd;
	}
	@Override
	public Patient update(Patient patient, Integer id) {
		Optional<Patient> patOpt = patRepo.findById(id);
		Patient dbPat = patOpt.get();
		if(dbPat != null) {
			if(patient.getDob() != null) dbPat.setDob(patient.getDob());
			if(patient.getFname() != null) dbPat.setFname(patient.getFname());
			if(patient.getLname() != null) dbPat.setLname(patient.getLname());
			if(patient.getImg() != null) dbPat.setImg(patient.getImg());
			patRepo.flush();
		}
		return dbPat;
	}
	@Override
	public void addProviderToPatient(Provider provider, Integer patId) {
		Optional<Patient> patOpt = patRepo.findById(patId);
		Patient dbPat = patOpt.get();
		if(dbPat != null) {
			dbPat.addProvider(provider);
			patRepo.flush();
		}
	}
	
}
