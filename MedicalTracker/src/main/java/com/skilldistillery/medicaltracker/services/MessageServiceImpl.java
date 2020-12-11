package com.skilldistillery.medicaltracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medicaltracker.entities.Message;
import com.skilldistillery.medicaltracker.repositories.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {
	
	@Autowired
	private MessageRepository repo;
	
	@Override
	public List<Message> index(){
		return repo.findAll();
	}
	
	@Override
	public Message showMessage(int messId) {
		Optional<Message> messOpt = repo.findById(messId);
		Message message = null;
		if(messOpt.isPresent()) {
		message = messOpt.get();
		}
		return message;
	}
	
	@Override
	public Message createMessage(Message message) {
		repo.saveAndFlush(message);
		return message;
	}
	
	@Override
	public Message updateMessage(int messId, Message message) {
		Optional<Message> messOpt = repo.findById(messId);
		Message managedMessage = null;
		if(messOpt.isPresent()) {
			managedMessage = messOpt.get();
			if(message.getContent() != null) {managedMessage.setContent(message.getContent());}
			if(message.getTitle() != null) {managedMessage.setTitle(message.getTitle());}
			if(message.getPatient() != null) {managedMessage.setPatient(message.getPatient());}
			if(message.getProvider() != null) {managedMessage.setProvider(message.getProvider());}
			repo.saveAndFlush(managedMessage);
		}
		
		return managedMessage;
	}
	
	@Override
	public boolean deleteMessage(int messId) {
		boolean deleted = false;
		Optional<Message> messOpt = repo.findById(messId);
		if(messOpt.isPresent()) {
			repo.deleteById(messId);
			deleted = true;
		}
		return deleted;
	}
	
	
	
	

}
