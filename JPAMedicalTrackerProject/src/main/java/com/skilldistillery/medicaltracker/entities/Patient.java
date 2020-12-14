package com.skilldistillery.medicaltracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="first_name")
	private String fname;
	@Column(name="last_name")
	private String lname;
	@Column(name="date_of_birth")
	private String dob;
	private String img;
	private String email;
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	@JsonIgnore
	@ManyToMany(mappedBy="patients")
	private List<Provider> providers;
	@JsonIgnore
	@OneToMany(mappedBy="patient")
	private List<Message> messages;
	@JsonIgnore
	@OneToMany(mappedBy="patient")
	private List<Medication> medications;
	@JsonIgnore
	@OneToMany(mappedBy="patient")
	private List<MedicalHistory> medHis;
	
	public Patient() {}
	public Patient(String fname, String lname, String dob, String img) {
		this.fname = fname;
		this.lname = lname;
		this.dob = dob;
		this.img = img;
	}
	
	public void addProvider(Provider provider) {
		if(providers == null) {
			providers = new ArrayList<Provider>();
		}
		if(!providers.contains(provider)) {
			providers.add(provider);
			provider.addPatient(this);
		}
	}
	public void removeProvider(Provider provider) {
		if (providers != null && providers.contains(provider)) {
			providers.remove(provider);
			provider.removePatient(this);
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
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<Provider> getProviders() {
		return providers;
	}
	public void setProviders(List<Provider> providers) {
		this.providers = providers;
	}
	public List<Message> getMessages() {
		return messages;
	}
	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
	public List<Medication> getMedications() {
		return medications;
	}
	public void setMedications(List<Medication> medications) {
		this.medications = medications;
	}
	public List<MedicalHistory> getMedHis() {
		return medHis;
	}
	public void setMedHis(List<MedicalHistory> medHis) {
		this.medHis = medHis;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
		Patient other = (Patient) obj;
		if (id != other.id)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Patient [id=" + id + ", fname=" + fname + ", lname=" + lname + ", dob=" + dob + ", img=" + img
				+ "]";
	}
	
	
}
