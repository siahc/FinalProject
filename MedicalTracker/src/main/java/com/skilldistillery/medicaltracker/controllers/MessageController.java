package com.skilldistillery.medicaltracker.controllers;

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
import com.skilldistillery.medicaltracker.services.MessageService;

@CrossOrigin({ "*", "http://localhost:4210" })
@RestController
@RequestMapping("api")
public class MessageController {
	
	@Autowired
	private MessageService svc;
	
	@GetMapping("message")
	public List<Message> list(){
		return svc.index();
	}
	
	@GetMapping("message/{messId}")
	public Message showMessage(@PathVariable Integer messId, HttpServletResponse response) {
		Message message = svc.showMessage(messId);
		if(message == null) {
			response.setStatus(404);
		}
		return message;
	}
	
	@PostMapping("message")
	public Message addMessage(
			@RequestBody Message message,
			HttpServletRequest request,
			HttpServletResponse response
	) {
		try {
		message = svc.createMessage(message);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(message.getId());
			response.setHeader("Location", url.toString());
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
	public void deleteFilm(
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
