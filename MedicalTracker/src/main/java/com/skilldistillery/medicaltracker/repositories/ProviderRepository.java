package com.skilldistillery.medicaltracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.medicaltracker.entities.Provider;

public interface ProviderRepository extends JpaRepository<Provider, Integer> {

}
