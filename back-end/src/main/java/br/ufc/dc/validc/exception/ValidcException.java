package br.ufc.dc.validc.exception;

import org.springframework.http.HttpStatus;

import br.ufc.dc.validc.model.Message;

public class ValidcException  extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5863576358696905707L;
	
	private HttpStatus status;
	private Message message;

	
	public ValidcException(HttpStatus status, String key, String message) {
		this.status = status;
		this.message = new Message(message, key);
	}


	public HttpStatus getStatus() {
		return status;
	}


	public void setStatus(HttpStatus status) {
		this.status = status;
	}


	public Message getMessageAsObject() {
		return message;
	}


	public void setMessage(Message message) {
		this.message = message;
	}



}
