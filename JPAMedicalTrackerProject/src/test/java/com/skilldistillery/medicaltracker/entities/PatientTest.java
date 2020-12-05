package com.skilldistillery.medicaltracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PatientTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Patient patient;

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
		patient =em.find(Patient.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		patient = null;
	}

	@Test
	void test_patient() {
		assertNotNull(patient);
		assertEquals("Winifred", patient.getFname());
	}
	
	@Test
	void test_patient_user_mapping() {
		User user = patient.getUser();
		assertNotNull(user);
		assertEquals("patient", user.getUsername());
	}
	
	@Test
	void test_patient_provider_list_mapping() {
		List<Provider> p = patient.getProviders();
		assertNotNull(p);
		assertTrue(p.size() > 0);
		assertEquals("Lane", p.get(0).getFname());
	}

}
