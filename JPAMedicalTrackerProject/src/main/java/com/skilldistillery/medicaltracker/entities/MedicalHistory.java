package com.skilldistillery.medicaltracker.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "medical_history")
public class MedicalHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String diagnosis;
	
	private boolean active;

	private String onset;
	
	private String treatment;
	
	@ManyToOne
	@JoinColumn(name = "patient_id")
	@JsonIgnore
	private Patient patient;
	@OneToMany(mappedBy = "medHis")
	@JsonIgnore
	private List<Medication> medications;
	
	//Methods
	
	public MedicalHistory() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getOnset() {
		return onset;
	}

	public void setOnset(String onset) {
		this.onset = onset;
	}

	public String getTreatment() {
		return treatment;
	}

	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public List<Medication> getMedications() {
		return medications;
	}

	public void setMedications(List<Medication> medications) {
		this.medications = medications;
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
		MedicalHistory other = (MedicalHistory) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "MedicalHistory [id=" + id + ", diagnosis=" + diagnosis + ", active=" + active + ", onset=" + onset
				+ ", treatment=" + treatment + ", patient=" + patient;
	}
	

}
