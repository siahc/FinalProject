package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;

public interface MedicalHistoryService {

	List<MedicalHistory> index();

	MedicalHistory findById(int medHisId);

	MedicalHistory createNewMedicalHistory(MedicalHistory medHis);

	boolean deleteMedicalHistory(int medId);

	MedicalHistory updateMedicalHistory(int medId, MedicalHistory medHis);

	List<Medication> findHistoryMedsById(int medHisId);
	


}
