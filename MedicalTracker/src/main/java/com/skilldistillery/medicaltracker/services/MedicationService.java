package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;

public interface MedicationService {

	List<Medication> index();

	Medication findById(int medId);

	Medication createMedication(Medication med);

	Medication updateMedication(int medId, Medication med);

	boolean deleteMedication(int medId);

	MedicalHistory findMedicationHistoryById(int medId);

	boolean addHistoryToMedication(int medId, int histId);

	boolean removeHistFromMed(int medId);


}
