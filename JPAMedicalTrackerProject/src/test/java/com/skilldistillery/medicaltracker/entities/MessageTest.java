package com.skilldistillery.medicaltracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MessageTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Message m;

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
		m = em.find(Message.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		m = null;
	}

	@Test
	void test_Message() {
		assertNotNull(m);
		assertEquals("Hello World", m.getContent());
		assertFalse(m.getSentByPt());
	}
	
	@Test
	void test_Message_Patient_mapping() {
		Patient p = m.getPatient();
		assertNotNull(p);
		assertEquals("Winifred", p.getFname());
	}
	
	@Test
	void test_Message_Provider_mapping() {
		Provider p = m.getProvider();
		assertNotNull(p);
		assertEquals("Lane", p.getFname());
	}

}
