package br.ufc.dc.validc.exception;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException  extends ValidcException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5361393063437297376L;
	

	
	public EntityNotFoundException(String key, String message) {
		super(HttpStatus.NOT_FOUND, key, message);
	}


	
	


}
