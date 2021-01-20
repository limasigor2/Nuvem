package br.ufc.dc.validc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufc.dc.validc.model.HashFile;

@Repository
public interface HashFileRepository extends JpaRepository<HashFile, Long> {
	Long deleteByFileName(String filename);
	Optional<HashFile> findByFileName(String filename);
}
