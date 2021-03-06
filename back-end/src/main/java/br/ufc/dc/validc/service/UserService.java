package br.ufc.dc.validc.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.model.Message;
import br.ufc.dc.validc.model.User;
//import br.ufc.dc.validc.model.requests.UserDto;
import br.ufc.dc.validc.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	public User saveOrUpdate(User user) {
//		user.generateExternalId();

		return userRepository.save(user);
	}

	public List<User> listUser(int page, int size) {
		List<User> users = userRepository.findAll(PageRequest.of(page, size)).getContent(); //
		//.forEach(user -> {
//			users.add(new UserDto(user.getName(), user.getUsername(), user.getEmail(), user.getExternalId(),
//					user.getRoles()));
//		});
		

		return users;
	}

	public Message delete(String externalId) throws EntityNotFoundException {
		User user = userRepository.findOneByExternalId(externalId)
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado", "database.user.notfound"));
		userRepository.delete(user);
		return new Message("Usuário deletado com sucesso", "user.delete.success");
	}

	public User update(User userToUpdate) throws EntityNotFoundException {
		User user = userRepository.findOneByExternalId(userToUpdate.getExternalId())
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado", "database.user.notfound"));

		if (!user.getUsername().equals(userToUpdate.getUsername()))
			user.setUsername(userToUpdate.getUsername());
		if (!user.getEmail().equals(userToUpdate.getEmail()))
			user.setEmail(userToUpdate.getEmail());
		if (!user.getName().equals(userToUpdate.getName()))
			user.setName(userToUpdate.getName());
		if (userToUpdate.getPassword() != null)
			user.setPassword(encoder.encode(userToUpdate.getPassword()));
		user.setPhonenumbers(userToUpdate.getPhonenumbers());
		userRepository.save(user);

		return user;
	}

	public User findOne(String username) throws EntityNotFoundException {
		User user = userRepository.findOneByUsername(username)
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado", "database.user.notfound"));
		return user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((userRepository == null) ? 0 : userRepository.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserService other = (UserService) obj;
		if (userRepository == null) {
			if (other.userRepository != null)
				return false;
		} else if (!userRepository.equals(other.userRepository))
			return false;
		return true;
	}

}
