package br.ufc.dc.validc.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(EntityNotFoundException.class)
	protected ResponseEntity<?> handleEntityNotFound(EntityNotFoundException ex) {
		return buildResponseEntity(ex);
	}
	@ExceptionHandler(FileStorageException.class)
	protected ResponseEntity<?> handleFileStorageException(EntityNotFoundException ex) {
		return buildResponseEntity(ex);
	}

	private ResponseEntity<?> buildResponseEntity(ValidcException validcException) {
		return ResponseEntity.status(validcException.getStatus()).body(validcException.getMessageAsObject());
	}
}
