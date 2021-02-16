package br.ufc.dc.validc.repository;



import org.springframework.stereotype.Repository;
import org.springframework.cloud.gcp.data.datastore.repository.DatastoreRepository;


import br.ufc.dc.validc.model.Validation;

@Repository
public interface ValidationRepository extends DatastoreRepository<Validation, String>{

//	public void save(Validation product) {
////		mapper.save(product);
//	}
//
//	public List<Validation> list(String username, String filename) {
////		DynamoDBScanExpression queryExpression = new DynamoDBScanExpression();
//		List<Validation> infos = new ArrayList<>();
//
//		return infos;
//	}
}