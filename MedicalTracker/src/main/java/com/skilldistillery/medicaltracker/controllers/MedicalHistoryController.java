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
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.services.MedicalHistoryService;
import com.skilldistillery.medicaltracker.services.UserService;


@RestController
@CrossOrigin({ "*", "http://localhost:4210" })
@RequestMapping("api")
public class MedicalHistoryController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private MedicalHistoryService svc;
	
	@GetMapping("medicalHistory")
	public List<MedicalHistory> list(){
		return svc.index();
	}
	
	
	@GetMapping("medicalHistory/{medHisId}")
	public MedicalHistory showMedicalHistory(@PathVariable Integer medHisId, HttpServletResponse response) {
		MedicalHistory med = svc.findById(medHisId);
		if(med == null) {
			response.setStatus(404);
		}
		return med;
	}
	@GetMapping("medicalHistory/{medHistId}/medications")
	public List<Medication> showHistoryMedications(@PathVariable Integer medHistId, HttpServletResponse res, HttpServletRequest req, Principal principal){
		List<Medication> meds = svc.findHistoryMedsById(medHistId);
		if(meds == null) {
			res.setStatus(404);
		}
		return meds;
	}
	@GetMapping("medicalHistory/{medHistId}/{medId}")
	public List<Medication> addMedToHist(@PathVariable Integer medHistId, @PathVariable Integer medId, HttpServletResponse res, HttpServletRequest req, Principal principal){
		List<Medication> meds = svc.addMedToHist(medHistId, medId);
		if(meds == null) {
			res.setStatus(404);
		}
		return meds;
	}
	@PostMapping("medicalHistory")
	public MedicalHistory addMedicalHistory(
			@RequestBody MedicalHistory medHis,
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
	) {
		User u = userService.getUserByUsername(principal.getName());
		medHis.setPatient(u.getPatient());
		try {
		medHis = svc.createNewMedicalHistory(medHis);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(medHis.getId());
			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			response.setStatus(400);
			medHis = null;
		}
		return medHis;
	}
	
	@PutMapping("medicalHistory/{medHisId}")
	public MedicalHistory updateMedicalHistory(
			@PathVariable Integer medHisId, 
			@RequestBody MedicalHistory medHis,
			HttpServletResponse response
	) {
		try {
			medHis = svc.updateMedicalHistory(medHisId, medHis);
			if (medHis == null) {
				response.setStatus(404);
				medHis = null;
			}
		} catch (Exception e) {
			response.setStatus(400);
			medHis = null;
		}
		return medHis;
	}
	
	@DeleteMapping("medicalHistory/{medHisId}")
	public void deleteMedicalHistory(
			@PathVariable Integer medHisId,
			HttpServletResponse response
	) {
		try {
			if (svc.deleteMedicalHistory(medHisId)) {
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
