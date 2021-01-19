package br.ufc.dc.validc.service;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.ufc.dc.validc.model.HashFile;
import br.ufc.dc.validc.repository.HashFileRepository;

@Service
public class HashFileService {

	@Autowired
	private HashFileRepository repository;

	public String save(MultipartFile file, String username, String fileName)
			throws NoSuchAlgorithmException, IOException {

		String hashValue = this.generateHash(username, fileName);

		HashFile hashFile = new HashFile(username + '/' + fileName, hashValue);
		repository.save(hashFile);
		return hashValue;
	}

	@Transactional
	public void delete(String username, String filename) {
		repository.deleteByFileName(username + "/" + filename);
	}

	public Optional<HashFile> get(String filename) {
		return repository.findByFileName(filename);
	}

	public String generateHash(String username, String filename) throws NoSuchAlgorithmException, IOException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] uploadBytes = (username + "/" + filename).getBytes();
		byte[] digest = md.digest(uploadBytes);
		String hashString = new BigInteger(1, digest).toString(16);
		return hashString;
	}

}
