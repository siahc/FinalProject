package com.skilldistillery.medicaltracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Integer> {

}
