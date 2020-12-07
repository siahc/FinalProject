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

class MedicalHistoryTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private MedicalHistory medHis;
	
	
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
		medHis = em.find(MedicalHistory.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		medHis = null;
	}

	@Test
	void test_MedicalHistory_entity_mapping() {
		assertNotNull(medHis);
		assertEquals("CHF", medHis.getDiagnosis());
		
		
	}
	@Test
	void test_MedicalHistory_Medication_mapping(){
		Medication m = medHis.getMedication();
		assertNotNull(m);
		assertEquals("Botox", m.getName());
	}
	@Test
	void test_Medical_History_mapping() {
		Patient p = medHis.getPatient();
		assertNotNull(p);
		assertEquals("Winifred", p.getFname());
	}
}
