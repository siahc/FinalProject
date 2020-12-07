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

import com.skilldistillery.medicaltracker.entities.Medication;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.services.MedicationService;
import com.skilldistillery.medicaltracker.services.UserService;

@CrossOrigin({ "*", "http://localhost:4210" })
@RestController
@RequestMapping("api")
public class MedicationController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private MedicationService svc;
	
	@GetMapping("medication")
	public List<Medication> list(){
		return svc.index();
	}
	
	@GetMapping("medication/{medId}")
	public Medication showMedication(@PathVariable Integer medId, HttpServletResponse response) {
		Medication med = svc.findById(medId);
		if(med == null) {
			response.setStatus(404);
		}
		return med;
	}
	
	
	@PostMapping("medication")
	public Medication addMedication(
			@RequestBody Medication med,
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
	) {
		User u = userService.getUserByUsername(principal.getName());
		med.setPatient(u.getPatient());
		try {
		med = svc.createMedication(med);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(med.getId());
			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			response.setStatus(400);
			med = null;
		}
		return med;
	}
	
	@PutMapping("medication/{medId}")
	public Medication updateMedication(
			@PathVariable Integer medId, 
			@RequestBody Medication med,
			HttpServletResponse response
	) {
		try {
			med = svc.updateMedication(medId, med);
			if (med == null) {
				response.setStatus(404);
				med = null;
			}
		} catch (Exception e) {
			response.setStatus(400);
			med = null;
		}
		return med;
	}
	
	@DeleteMapping("medication/{medId}")
	public void deleteMedication(
			@PathVariable Integer medId,
			HttpServletResponse response
	) {
		try {
			if (svc.deleteMedication(medId)) {
				response.setStatus(204);
			}
			else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
		}
	}

}
