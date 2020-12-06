package com.skilldistillery.medicaltracker.services;

import java.util.List;

import com.skilldistillery.medicaltracker.entities.Message;

public interface MessageService {

	List<Message> index();

	Message showMessage(int messId);

	Message createMessage(Message message);

	Message updateMessage(int messId, Message message);

	boolean deleteMessage(int messId);

}
