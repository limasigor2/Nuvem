package br.ufc.dc.validc.exception;

import org.springframework.http.HttpStatus;

public class FileStorageException extends ValidcException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5081544320819487069L;

	
	public FileStorageException( String key, String message) {
		super(HttpStatus.NOT_FOUND, key, message);
	}
	public FileStorageException(HttpStatus status, String key, String message) {
		super(status, key, message);
	}

	
}
