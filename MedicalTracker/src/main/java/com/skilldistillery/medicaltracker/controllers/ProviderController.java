package com.skilldistillery.medicaltracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.medicaltracker.entities.Provider;
import com.skilldistillery.medicaltracker.services.ProviderService;

@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4210"})
@RestController
public class ProviderController {
	
	@Autowired
	private ProviderService providerSvc;
	
	@GetMapping("provider")
	public List<Provider> getProviders(){
		return providerSvc.getAllProviders();
	}
	
	@GetMapping("provider/{id}")
	public Provider findProvider(
		@PathVariable int id,
		HttpServletResponse response
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
			HttpServletResponse response
		) {
		providerSvc.createProvider(provider);
			
		if(provider == null) {
			response.setStatus(400);
		}
		return provider;
	}
	
	
	

}



