package com.skilldistillery.medicaltracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.repositories.MedicalHistoryRepository;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService {
	
	private MedicalHistoryRepository repo;
	
	
	@Override
	public List<MedicalHistory> index() {
		return repo.findAll();
	}
	

	
	@Override
	public MedicalHistory findById(int medHisId) {
		Optional<MedicalHistory> medOpt = repo.findById(medHisId);
		MedicalHistory medHis = null;
		if(medOpt.isPresent()) {
		medHis = medOpt.get();
		}
		return medHis;
	}
	
	@Override
	public MedicalHistory createNewMedicalHistory(MedicalHistory medHis) {
		repo.saveAndFlush(medHis);
		return medHis;
	}
	
	@Override
	public MedicalHistory updateMedicalHistory(int medId, MedicalHistory medHis) {
		Optional<MedicalHistory> medOpt = repo.findById(medId);
		MedicalHistory managedMed = null;
		if(medOpt.isPresent()) {
			managedMed = medOpt.get();
			if(medHis.getDiagnosis() != null) {managedMed.setDiagnosis(medHis.getDiagnosis());}
			if(medHis.isActive() != false) {managedMed.setActive(medHis.isActive());}
			if(medHis.getOnset() != null) {managedMed.setOnset(medHis.getOnset());}
			if(medHis.getTreatment() != null) {managedMed.setTreatment(medHis.getTreatment());}
			if(medHis.getPatient() != null) {managedMed.setPatient(medHis.getPatient());}
			if(medHis.getMedication() != null) {managedMed.setMedication(medHis.getMedication());}
			repo.saveAndFlush(managedMed);
		}
		
		return managedMed;
	}
	
	@Override
	public boolean deleteMedicalHistory(int medId) {
		boolean deleted = false;
		Optional<MedicalHistory> medOpt = repo.findById(medId);
		if(medOpt.isPresent()) {
			repo.deleteById(medId);
			deleted = true;
		}
		return deleted;
	}

}
