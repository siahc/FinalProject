package com.skilldistillery.medicaltracker.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({ "*", "http://localhost:4210" })
@RestController
@RequestMapping("api")
public class TestController {
	
	@GetMapping("ping")
	public String ping() {
		return "Pong";
	}
}
