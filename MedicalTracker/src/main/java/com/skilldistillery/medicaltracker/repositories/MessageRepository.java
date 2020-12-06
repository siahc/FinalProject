package com.skilldistillery.medicaltracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.medicaltracker.entities.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{

}
