package br.ufc.dc.validc.exception;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException  extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5361393063437297376L;
	
	private HttpStatus status;
	private String key;
	private String message;
	
	public EntityNotFoundException(String key, String message) {
		super();
		this.status = HttpStatus.NOT_FOUND;
		this.key = key;
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
	


}
