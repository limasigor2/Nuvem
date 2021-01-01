package br.ufc.dc.validc.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.model.Message;
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
	
	public List<User> listUser(int page, int size){
		Page<User> users = userRepository.findAll(PageRequest.of(page, size));
		return users.getContent();
	}
	
	public Message delete(String externalId) throws EntityNotFoundException {
		User user = userRepository.findOneByExternalId(externalId).orElseThrow(() ->
			new EntityNotFoundException("User não encontrado", "database.user.notfound"));
		userRepository.delete(user);
		return new Message("Usuário deletado com sucesso", "user.delete.success");
	}

	public User update(String externalId, User userToUpdate)  throws EntityNotFoundException{
		User user = userRepository.findOneByExternalId(externalId).orElseThrow(() ->
		new EntityNotFoundException("User não encontrado", "database.user.notfound"));
		
		if(!user.getEmail().equals(userToUpdate.getEmail()))
			user.setEmail(userToUpdate.getExternalId());
		if(!user.getName().equals(userToUpdate.getPassword()))
			user.setName(userToUpdate.getName());
		
		userRepository.save(user);
		
		return userRepository.save(user);
	}

	public User findOne(String externalId) throws EntityNotFoundException {
		User user = userRepository.findOneByExternalId(externalId).orElseThrow(() ->
			new EntityNotFoundException("User não encontrado", "database.user.notfound"));
		return user;
	}
	

}
