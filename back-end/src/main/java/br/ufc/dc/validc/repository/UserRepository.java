package br.ufc.dc.validc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufc.dc.validc.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
}
