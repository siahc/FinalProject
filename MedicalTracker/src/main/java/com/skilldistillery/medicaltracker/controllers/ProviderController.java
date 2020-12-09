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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.medicaltracker.entities.MedicalHistory;
import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.services.PatientService;
import com.skilldistillery.medicaltracker.services.ProviderService;
import com.skilldistillery.medicaltracker.services.UserService;

@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4210"})
@RestController
public class ProviderController {
	
	@Autowired
	private ProviderService providerSvc;
	@Autowired
	private PatientService patServ;
	@Autowired
	private UserService userSvc;
	
	@GetMapping("provider/all")
	public List<Provider> getProviders(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			){
		return providerSvc.getAllProviders();
	}
	
	@GetMapping("provider/{id}")
	public Provider findProvider(
		@PathVariable int id,
		HttpServletRequest request,
		HttpServletResponse response,
		Principal principal
		) {
		if(id < 1) {
			response.setStatus(400);
			return null;
		}
		
		Provider p = providerSvc.findById(id);
		if (p == null) {
			response.setStatus(404);
		}
		return p;
	}
	
	@PostMapping("provider")
	public Provider createProvider(
			@RequestBody Provider provider,
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
		) {
		providerSvc.createProvider(provider);
			
		if(provider == null) {
			response.setStatus(400);
		}
		return provider;
	}
	
	@GetMapping("providerinfo")
	public Provider showProvider(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			) {
		return providerSvc.getProviderByUsername(principal.getName());
	}
	@GetMapping("providerpatients")
	public List<Patient> showProviderPatients(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			) {
		return providerSvc.getProviderPatientsByUsername(principal.getName());
	}
	
	@DeleteMapping("providerpatients/{id}")
	public boolean removePatient(
			HttpServletRequest request,
			HttpServletRequest response,
			Principal principal,
			@PathVariable int id
			) {
		return providerSvc.removePatient(id, principal.getName());
	}
	
	@PostMapping("providerpatients/{id}")
	public boolean addPatientToProvider(
			HttpServletRequest request,
			HttpServletRequest response,
			Principal principal,
			@PathVariable int id
			) {
		return providerSvc.addPatientToProvider(id, principal.getName());
	}
	
	//Provider patient views
	@GetMapping("providerpatients/{pid}")
	public Patient showById(HttpServletRequest req, HttpServletResponse res, @PathVariable int pid, Principal principal) {
		User u = userSvc.getUserByUsername(principal.getName());
		Provider prov = u.getProvider();
		Patient pat = patServ.findPatientById(pid);
		if (prov.getPatients().contains(pat)) {
		if (pat == null) {
			res.setStatus(404);
		}
		return pat;
		}
		return null;
	}
	@GetMapping("providerpatients/{pid}/medications")
	public List<Medication> showMeds(HttpServletRequest req, HttpServletResponse res, @PathVariable int pid, Principal principal) {
		User u = userSvc.getUserByUsername(principal.getName());
		Provider prov = u.getProvider();		
		Patient pat = patServ.findPatientById(pid);
		if (prov.getPatients().contains(pat)) {
		List<Medication> meds = pat.getMedications();
		if (meds == null) {
			res.setStatus(404);
		}
		return meds;
		}
		return null;
	}
	@GetMapping("providerpatients/{pid}/history")
	public List<MedicalHistory> showHistory(HttpServletRequest req, HttpServletResponse res, @PathVariable int pid, Principal principal) {
		User u = userSvc.getUserByUsername(principal.getName());
		Provider prov = u.getProvider();
		Patient pat = patServ.findPatientById(pid);
		if (prov.getPatients().contains(pat)) {
		List<MedicalHistory> meds = pat.getMedHis();
		if (meds == null) {
			res.setStatus(404);
		}
		return meds;
		}
		return null;
		
	}
}



