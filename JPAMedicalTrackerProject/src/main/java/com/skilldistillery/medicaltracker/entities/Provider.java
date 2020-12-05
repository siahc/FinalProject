package com.skilldistillery.medicaltracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class Provider {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="first_name")
	private String fname;
	@Column(name="last_name")
	private String lname;
	private String location;
	private String title;
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	@JoinTable(name="provider_has_patient",
	joinColumns = @JoinColumn(name = "provider_id"),
	inverseJoinColumns = @JoinColumn(name = "patient_id"))
	private List<Patient> patients;
	
	
	public Provider() {}
	public Provider(String fname, String lname, String location, String title) {
		this.fname = fname; 
		this.lname = lname;
		this.location = location;
		this.title = title;
	}
	
	public void addPatient(Patient patient) {
		if (patients == null) {
			patients = new ArrayList<Patient>();
		}
		if (!patients.contains(patient)) {
			patients.add(patient);
			patient.addProvider(this);
		}
	}
	
	public void removePatient(Patient patient) {
		if (patients != null && patients.contains(patient)) {
			patients.remove(patient);
			patient.removeProvider(this);
		}
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<Patient> getPatients() {
		return patients;
	}
	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Provider other = (Provider) obj;
		if (id != other.id)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Provider [id=" + id + ", fname=" + fname + ", lname=" + lname + ", location=" + location + ", title="
				+ title + "]";
	}
	
	

}
