package com.skilldistillery.medicaltracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.repositories.PatientRespository;
import com.skilldistillery.medicaltracker.repositories.ProviderRepository;
import com.skilldistillery.medicaltracker.repositories.UserRepository;

@Service
public class PatientServiceImpl implements PatientService {
	@Autowired
	private PatientRespository patRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ProviderRepository providerRepo;

	@Override
	public Patient findPatientById(int id) {
		Optional<Patient> ptOpt = patRepo.findById(id);
		if (ptOpt.isPresent()) {
			return ptOpt.get();
		}
		return null;
	}
	@Override
	public Patient createPatient(Patient patient, String username) {
		Patient patToAdd = patient;
		User user = userRepo.findUniqueByUsername(username);
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
			if(patient.getEmail() != null) dbPat.setEmail(patient.getEmail());
			patRepo.flush();
		}
		return dbPat;
	}
	@Override
	public Patient showPat(String username, int patId) {
		Patient pat = patRepo.findByUser_UsernameAndId(username, patId);
		return pat;
	}
	
	@Override
	public List<Patient> showAllPatients(){
		return patRepo.findAll();
	}
	
	@Override
	public List<Medication> listMeds(Integer patId) {
		Optional<Patient> patOpt = patRepo.findById(patId);
		Patient dbPat = patOpt.get();
		if (dbPat != null) {
			return dbPat.getMedications();
		}
		return null;
	}
	@Override
	public List<MedicalHistory> listMedHist(Integer patId) {
		Optional<Patient> patOpt = patRepo.findById(patId);
		Patient dbPat = patOpt.get();
		if (dbPat != null) {
			return dbPat.getMedHis();
		}
		return null;
	}
	@Override
	public List<Provider> listProviders(String username){
		User u = userRepo.findUniqueByUsername(username);
		return u.getPatient().getProviders();
	}
	
	@Override
	public Boolean removeProvider(int id, String username) {
		User u = userRepo.findUniqueByUsername(username);
		Patient p = u.getPatient();
		Optional<Provider> prov = providerRepo.findById(id);
		Provider provider = prov.get();
		p.removeProvider(provider);
		providerRepo.saveAndFlush(provider);
		patRepo.saveAndFlush(p);
		boolean delete = !p.getProviders().contains(provider);
		return delete;
	}
	
	@Override
	public Boolean addProviderToPatient(int id, String username) {
		User u = userRepo.findUniqueByUsername(username);
		Patient p = u.getPatient();
		Optional<Provider> prov = providerRepo.findById(id);
		Provider provider = prov.get();
		p.addProvider(provider);
		patRepo.save(p);
		Boolean added = p.getProviders().contains(provider);
		return added;
	}
}
