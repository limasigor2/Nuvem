package br.ufc.dc.validc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.dc.validc.model.User;
import br.ufc.dc.validc.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@PostMapping("/")
	public ResponseEntity<User> save(@RequestBody User user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.saveOrUpdate(user));
	}

}
