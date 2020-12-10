package com.skilldistillery.medicaltracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.repositories.MedicationRepository;



@Service
public class MedicationServiceImpl implements MedicationService {
	
	@Autowired
	private MedicationRepository repo;
	
	@Override
	public List<Medication> index() {
		return repo.findAll();
	}
	

	@Override
	public Medication findById(int medId) {
		Optional<Medication> medOpt = repo.findById(medId);
		Medication med = null;
		if(medOpt.isPresent()) {
		med = medOpt.get();
		}
		return med;
	}
	@Override
	public MedicalHistory findMedicationHistoryById(int medId) {
		Optional<Medication> medOpt = repo.findById(medId);
		Medication med = null;
		MedicalHistory medHist = null;
		if(medOpt.isPresent()) {
			med = medOpt.get();
			medHist = med.getMedHis();
		}
		return medHist;
	}
	
	@Override
	public Medication createMedication(Medication med) {
		repo.saveAndFlush(med);
		return med;
	}
	
	
	@Override
	public Medication updateMedication(int medId, Medication med) {
		Optional<Medication> medOpt = repo.findById(medId);
		Medication managedMed = null;
		if(medOpt.isPresent()) {
			managedMed = medOpt.get();
			if(med.getName() != null) {managedMed.setName(med.getName());}
			if(med.getDescription() != null) {managedMed.setDescription(med.getDescription());}
			if(med.getDose() != null) {managedMed.setDose(med.getDose());}
			if(med.getFrequency() != null) {managedMed.setFrequency(med.getFrequency());}
			if(med.getProvider() != null) {managedMed.setProvider(med.getProvider());}
			if(med.getComment() != null) {managedMed.setComment(med.getComment());}
			if(med.getActive() != null) {managedMed.setActive(med.getActive());}
			if(med.getPatient() != null) {managedMed.setPatient(med.getPatient());}
			if(med.getMedHis() != null) {managedMed.setMedHis(med.getMedHis());}
			repo.saveAndFlush(managedMed);
		}
		
		return managedMed;
	}
	
	
	@Override
	public boolean deleteMedication(int medId) {
		boolean deleted = false;
		Optional<Medication> medOpt = repo.findById(medId);
		if(medOpt.isPresent()) {
			Medication med = medOpt.get();
			med.setMedHis(null);
			repo.saveAndFlush(med);
			repo.deleteById(medId);
			deleted = true;
		}
		return deleted;
	}
	
	

}
