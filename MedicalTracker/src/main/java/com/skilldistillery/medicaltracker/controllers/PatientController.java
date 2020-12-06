package com.skilldistillery.medicaltracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.services.PatientService;

@RestController
@RequestMapping("api")
public class PatientController {
	@Autowired
	private PatientService patServ;
	
	@GetMapping("patients")
	public List<Patient> showAllPats(HttpServletRequest req, HttpServletResponse res){
		List<Patient> pats = patServ.showAllPatients();
		if (pats != null) {
			return pats;
		}
		return null;
	}
	
	@GetMapping("patients/{pid}")
	public Patient showById(HttpServletRequest req, HttpServletResponse res, @PathVariable int pid, Principal principal) {
		Patient pat = patServ.showPat(principal.getName(), pid);
		if (pat == null) {
			res.setStatus(404);
		}
		return pat;
	}
	@GetMapping("patients/{pid}/medications")
	public List<Medication> showMeds(HttpServletRequest req, HttpServletResponse res, @PathVariable int pid, Principal principal) {
		Patient pat = patServ.showPat(principal.getName(), pid);
		System.out.println(pat.getFname() + "**************************************");
		List<Medication> meds = pat.getMedications();
		if (meds == null) {
			res.setStatus(404);
		}
		return meds;
	}

}
