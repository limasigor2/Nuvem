package br.ufc.dc.validc.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.exception.ValidcException;
import br.ufc.dc.validc.model.HashFile;
import br.ufc.dc.validc.model.Validation;
import br.ufc.dc.validc.model.Message;

@Service
public class ValidationService {

	@Autowired
	private HashFileService hashFileService;

//	@Autowired
//	private DynamoDbService dynamoDbService;

//	@Autowired
//	private FileStorageService fileStorageService;

	public Message validate(MultipartFile file, String motivo, String filename, String username)
			throws NoSuchAlgorithmException, ValidcException, IOException {
		HashFile hashFile = hashFileService.get(username + "/" + filename).orElseThrow(
				() -> new EntityNotFoundException("file.not-found", "Arquivo " + filename + " não encontrado"));
//		String filename2 = fileStorageService.getFileName(file);
		String hash = hashFileService.generateHash(username, filename);
		if (hash.equals(hashFile.getHash())) {
//			InfoValidation infoValidation = new InfoValidation(LocalDateTime.now(), motivo, true, filename, username);
//			dynamoDbService.insertIntoDynamoDB(infoValidation);
			return new Message("Arquivo validado", "file");
		} else {

//			InfoValidation infoValidation = new InfoValidation(LocalDateTime.now(), motivo, false, filename, username);
//			dynamoDbService.insertIntoDynamoDB(infoValidation);

			throw new ValidcException(HttpStatus.BAD_REQUEST, "file.hash.different",
					"Hash diferente para validar o arquivo");
		}

	}

	public List<Validation> listValidations(String username, String filename) {
		List<Validation> infos = new ArrayList<>();
//		infos.addAll(dynamoDbService.list(username, filename));
		return infos;
	}

}
