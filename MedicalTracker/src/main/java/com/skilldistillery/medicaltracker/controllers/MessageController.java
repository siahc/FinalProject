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

import com.skilldistillery.medicaltracker.entities.Message;
import com.skilldistillery.medicaltracker.entities.Patient;
import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.entities.User;
import com.skilldistillery.medicaltracker.services.MessageService;
import com.skilldistillery.medicaltracker.services.PatientService;
import com.skilldistillery.medicaltracker.services.ProviderService;
import com.skilldistillery.medicaltracker.services.UserService;

@CrossOrigin({ "*", "http://localhost:8090" })
@RestController
@RequestMapping("api")
public class MessageController {
	
	@Autowired
	private MessageService svc;
	@Autowired
	private ProviderService providerSvc;
	@Autowired
	private PatientService ptSvc;
	@Autowired
	private UserService userSvc;
	
	@GetMapping("message/{messId}")
	public Message showMessage(@PathVariable Integer messId, HttpServletResponse response) {
		Message message = svc.showMessage(messId);
		if(message == null) {
			response.setStatus(404);
		}
		return message;
	}
	
	@GetMapping("message")
	public List<Message> getUserMessage(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			){
		User u = userSvc.getUserByUsername(principal.getName());
		Patient pt = null;
		Provider prov = null;
		if(u.getPatient() != null) {
			pt = u.getPatient();
			return pt.getMessages();
		} else {
			prov = u.getProvider();
			return prov.getMessages();
		}
	}
	
	@PostMapping("message/{id}")
	public Message addMessage(
			@PathVariable Integer id,
			@RequestBody Message message,
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
	) {
		User u = userSvc.getUserByUsername(principal.getName());
		Patient pt = null;
		Provider prov = null;
		if(u.getPatient() != null) {
			pt = u.getPatient();
			prov = providerSvc.findById(id);
		} else {
			prov = u.getProvider();
			pt = ptSvc.findPatientById(id);
		}
		message.setPatient(pt);
		message.setProvider(prov);
		try {
			message = svc.createMessage(message);
			response.setStatus(201);
//			StringBuffer url = request.getRequestURL();
//			url.append("/").append(message.getId());
//			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			response.setStatus(400);
			message = null;
		}
		return message;
	}
	
	@PutMapping("message/{messId}")
	public Message updateMessage(
			@PathVariable Integer messId, 
			@RequestBody Message message,
			HttpServletResponse response
	) {
		try {
			message = svc.updateMessage(messId, message);
			if (message == null) {
				response.setStatus(404);
				message = null;
			}
		} catch (Exception e) {
			response.setStatus(400);
			message = null;
		}
		return message;
	}
	
	@DeleteMapping("message/{messId}")
	public void deleteMessage(
			@PathVariable Integer messId,
			HttpServletResponse response
	) {
		try {
			if (svc.deleteMessage(messId)) {
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
