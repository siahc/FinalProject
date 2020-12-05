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

class ProviderTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Provider provider;

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
		provider =em.find(Provider.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		provider = null;
	}

	@Test
	void test_Provider() {
		assertNotNull(provider);
		assertEquals("Lane", provider.getFname());
	}
	
	@Test
	void test_Provider_user_mapping() {
		User user = provider.getUser();
		assertNotNull(user);
		assertEquals("provider", user.getUsername());
	}
	
	@Test
	void test_Provider_patients_mapping() {
		List<Patient> p = provider.getPatients();
		assertNotNull(p);
		assertTrue(p.size() > 0);
		assertEquals("Winifred", p.get(0).getFname());
	}

}
