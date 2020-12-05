package com.skilldistillery.medicaltracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MedicationTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Medication m;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("MedicalTrackerPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		m = em.find(Medication.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		m = null;
	}

	@Test
	void test_medication() {
		assertNotNull(m);
		assertEquals("Botox", m.getName());
	}
	
	@Test
	void test_medication_patient_mapping() {
		Patient p = m.getPatient();
		assertNotNull(p);
		assertEquals("Winifred", p.getFname());
	}

}
