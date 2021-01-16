package br.ufc.dc.validc.controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.model.User;
import br.ufc.dc.validc.model.requests.UserDto;
import br.ufc.dc.validc.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService service;
	
//	@PostMapping("/")
//	public ResponseEntity<?> save(@RequestBody User user) {
//		return ResponseEntity.status(HttpStatus.CREATED).body(service.saveOrUpdate(user));
//	}
//	
	@GetMapping("/list")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> list(@RequestParam("page") int page, @RequestParam("size") int size){
		return ResponseEntity.status(HttpStatus.OK).body(service.listUser(page, size));
	}
	
	@DeleteMapping("/{externalId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> delete(@PathVariable("externalId") String externalId) throws EntityNotFoundException{
		return ResponseEntity.status(HttpStatus.OK).body(service.delete(externalId));
	}

//	@PatchMapping("/{externalId}")
//	public ResponseEntity<?> update(@RequestBody User user, @PathVariable("externalId") String externalId) throws EntityNotFoundException{
//		return ResponseEntity.status(HttpStatus.OK).body(service.update(externalId, user));
//	}
	
	@GetMapping("/{username}")
	@PreAuthorize("authentication.principal.username == #username ||hasRole('ADMIN')")
	public ResponseEntity<?> findOne(@PathVariable("username") String username) throws EntityNotFoundException{
		return ResponseEntity.status(HttpStatus.OK).body(service.findOne(username));
	}
	
	@GetMapping("/me")
	@PreAuthorize("authentication.principal.username == #username ||hasRole('USER')")
	public ResponseEntity<?> getUser(@RequestParam("username") String username) throws EntityNotFoundException{
		System.out.print(username);
		return ResponseEntity.status(HttpStatus.OK).body(service.findOne(username));
	}
	
	@PutMapping("/me")
	@PreAuthorize("authentication.principal.username == #user.getUsername() ||hasRole('USER')")
	public ResponseEntity<?> putUser(@RequestBody User user) throws EntityNotFoundException{
		return ResponseEntity.status(HttpStatus.OK).body(service.saveOrUpdate( user));
	}

}
