package br.ufc.dc.validc.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufc.dc.validc.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Page<User> findAll(Pageable pageable);
	User deleteByExternalId(String externalId);
	Optional<User> findOneByExternalId(String externalId);


}
