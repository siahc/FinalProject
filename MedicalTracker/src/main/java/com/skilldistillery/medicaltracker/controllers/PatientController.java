package com.skilldistillery.medicaltracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.services.PatientService;
import com.skilldistillery.medicaltracker.services.UserService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
@RequestMapping("api")
public class PatientController {
	@Autowired
	private PatientService patServ;
	@Autowired 
	private UserService userSvc;
	
//	@GetMapping("patient")
//	public List<Patient> showAllPats(HttpServletRequest req, HttpServletResponse res){
//		List<Patient> pats = patServ.showAllPatients();
//		if (pats != null) {
//			return pats;
//		}
//		return null;
//	}	
	
	@PostMapping("patient")
	public Patient createPatient(HttpServletRequest req, HttpServletResponse res, @RequestBody Patient pat, Principal principal) {
		return patServ.createPatient(pat, principal.getName());
	}
	
	@DeleteMapping("patient/providers/{id}")
	public boolean removeProvider(
			HttpServletRequest request,
			HttpServletRequest response,
			Principal principal,
			@PathVariable int id
			) {
		return patServ.removeProvider(id, principal.getName());
	}
	
	@GetMapping("patient/providers/{id}")
	public boolean addProviderToPatient(
			HttpServletRequest request,
			HttpServletRequest response,
			Principal principal,
			@PathVariable int id
			) {
		return patServ.addProviderToPatient(id, principal.getName());
	}
	
	@GetMapping("patient")
	public Patient userPatientInfo(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			) {
		return userSvc.getUserPatient(principal.getName());
	}
	@GetMapping("patient/medHis")
	public List<MedicalHistory> userPatientMedHis(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			) {
		return userSvc.getUserPatientMedHis(principal.getName());
	}
	@GetMapping("patient/medication")
	public List<Medication> userPatientMedication(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			) {
		return userSvc.getUserPatientMeds(principal.getName());
	}
	@GetMapping("patient/providers")
	public List<Provider> userProviderList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			){
		return patServ.listProviders(principal.getName());
	}
	@PutMapping("patient/{id}")
	public Patient updatePatientInfo(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			@PathVariable int id,
			@RequestBody Patient pt
			) {
		return patServ.update(pt, id);
	}
}
