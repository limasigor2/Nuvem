package br.ufc.dc.validc.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;

import br.ufc.dc.validc.model.InfoValidation;

@Repository
public class InfoValidationRepository {

	@Autowired
	private DynamoDBMapper mapper;

	public void save(InfoValidation product) {
		mapper.save(product);
	}

	public List<InfoValidation> list(String username, String filename) {
		DynamoDBScanExpression queryExpression = new DynamoDBScanExpression();
		List<InfoValidation> infos = new ArrayList<>();
		mapper.scan(InfoValidation.class, queryExpression).forEach(elem -> {
			if (elem.getFilename().equals(filename))
				if (elem.getUsername().equals(username))
					infos.add(elem);
		});
		return infos;
	}
}