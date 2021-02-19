package br.ufc.dc.validc.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.exception.ValidcException;
import br.ufc.dc.validc.model.HashFile;
import br.ufc.dc.validc.model.Validation;
import br.ufc.dc.validc.repository.ValidationRepository;
import br.ufc.dc.validc.model.Message;

@Service
public class ValidationService {

	@Autowired
	private HashFileService hashFileService;

	@Autowired
	private ValidationRepository validationRepository;

	Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	public Message validate(MultipartFile file, String motivo, String filename, String username)
			throws NoSuchAlgorithmException, ValidcException, IOException {
		HashFile hashFile = hashFileService.get(username + "/" + filename).orElseThrow(
				() -> new EntityNotFoundException("file.not-found", "Arquivo " + filename + " não encontrado"));
		String hash = hashFileService.generateHash(username, filename);
		if (hash.equals(hashFile.getHash())) {
			Validation infoValidation = new Validation(LocalDateTime.now(), motivo, true, filename, username);
			validationRepository.save(infoValidation);
			return new Message("Arquivo validado", "file");
		} else {

			Validation infoValidation = new Validation(LocalDateTime.now(), motivo, false, filename, username);
			validationRepository.save(infoValidation);

			throw new ValidcException(HttpStatus.BAD_REQUEST, "file.hash.different",
					"Hash diferente para validar o arquivo");
		}

	}

	public List<Validation> listValidations(String username, String filename) {
		List<Validation> infos = new ArrayList<>();

		validationRepository.list(username, filename);
//		infos.addAll(dynamoDbService.list(username, filename));
		return infos;
	}

}