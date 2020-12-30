package br.ufc.dc.validc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.ufc.dc.validc.model.User;
import br.ufc.dc.validc.repository.UserRepository;

@Service
public class UserService {

	
	@Autowired
	private UserRepository userRepository;
	
	public User saveOrUpdate(User user) {
		user.generateExternalId();
		
		return userRepository.save(user);
	}
	

}
