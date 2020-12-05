package com.skilldistillery.medicaltracker.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	
	public Patient() {}
	public Patient(String fname, String lname, String dob, String img) {
		this.fname = fname;
		this.lname = lname;
		this.dob = dob;
		this.img = img;
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
	public String getimg() {
		return img;
	}
	public void setimg(String img) {
		this.img = img;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
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
