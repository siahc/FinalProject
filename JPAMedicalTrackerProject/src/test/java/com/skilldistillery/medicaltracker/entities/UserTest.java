package com.skilldistillery.medicaltracker.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user =em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		user = null;
	}

	@Test
	void test() {
		assertNotNull(user);
		assertEquals("admin", user.getUsername());
		assertEquals("admin", user.getRole());
	}
	
	@Test
	void test_user_patient_mapping() {
		user = em.find(User.class, 2);
		Patient pat = user.getPatient();
		assertNotNull(pat);
		assertEquals("Winifred", pat.getFname());
	}
	
	@Test
	void test_user_provider_mapping() {
		user = em.find(User.class, 3);
		Provider provider = user.getProvider();
		assertNotNull(provider);
		assertEquals("Lane", provider.getFname());
	}

}
