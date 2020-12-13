package com.skilldistillery.medicaltracker.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String content;
	@CreationTimestamp
	@Column(name="creation_date")
	private LocalDateTime creationDate;
	@Column(name="provider_read")
	private Boolean providerRead;
	@Column(name="patient_read")
	private Boolean patientRead;
	@ManyToOne
	@JoinColumn(name="patient_id")
	private Patient patient;
	@ManyToOne
	@JoinColumn(name="provider_id")
	private Provider provider;
	@Column(name="sent_by_patient")
	private Boolean sentByPt;
	
	public Message(){}
	public Message(String content) {
		this.content = content;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Provider getProvider() {
		return provider;
	}
	public void setProvider(Provider provider) {
		this.provider = provider;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
	public Boolean getProviderRead() {
		return providerRead;
	}
	public void setProviderRead(Boolean providerRead) {
		this.providerRead = providerRead;
	}
	public Boolean getPatientRead() {
		return patientRead;
	}
	public void setPatientRead(Boolean patientRead) {
		this.patientRead = patientRead;
	}
	public Boolean getSentByPt() {
		return sentByPt;
	}
	public void setSentByPt(Boolean sentByPt) {
		this.sentByPt = sentByPt;
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
		Message other = (Message) obj;
		if (id != other.id)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Message [id=" + id + ", content=" + content + ", patient=" + patient.getFname() + ", provider=" + provider.getLname() + "]";
	}
	
	
}
