package com.skilldistillery.medicaltracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.medicaltracker.entities.Medication;

public interface MedicationRepository extends JpaRepository<Medication, Integer>{

}
