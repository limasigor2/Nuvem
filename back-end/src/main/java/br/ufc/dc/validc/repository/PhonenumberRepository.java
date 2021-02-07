package br.ufc.dc.validc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufc.dc.validc.model.Phonenumber;

public interface PhonenumberRepository extends JpaRepository<Phonenumber, Long> {

}
