//package br.ufc.dc.validc.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import br.ufc.dc.validc.model.InfoValidation;
//import br.ufc.dc.validc.repository.InfoValidationRepository;
//
//@Service
//public class DynamoDbService {
//
//	@Autowired
//	private InfoValidationRepository repository;
//
//	public void insertIntoDynamoDB(InfoValidation infoValidation) {
//		repository.save(infoValidation);
//
//	}
//
//	public List<InfoValidation> list(String username, String filename) {
//		return repository.list(username, filename);
//	}
//}
