package br.ufc.dc.validc.exception;

import javax.persistence.NonUniqueResultException;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.ufc.dc.validc.model.Message;

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

	@ExceptionHandler(ValidcException.class)
	protected ResponseEntity<?> handleValidcException(ValidcException ex) {
		return buildResponseEntity(ex);
	}

//	@ExceptionHandler(NonUniqueResultException.class)
//	protected ResponseEntity<?> handleNonUniqueResultException(NonUniqueResultException ex) {
//		return buildResponseEntity(ex);
//	}

	private ResponseEntity<?> buildResponseEntity(ValidcException validcException) {
		return ResponseEntity.status(validcException.getStatus()).body(validcException.getMessageAsObject());
	}

//	private ResponseEntity<?> buildResponseEntity(NonUniqueResultException validcException) {
//		Message msg = new Message("Arquivo não encontrado", "file.not-found");
//		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
//	}

}
