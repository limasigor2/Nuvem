package br.ufc.dc.validc.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;

import br.ufc.dc.validc.model.Validation;

@Repository
public class ValidationRepository {

	Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	public void save(Validation infoValidation) {
		Key validationKey = datastore.newKeyFactory().setKind(Validation.class.getCanonicalName())
				.newKey(infoValidation.getId());
		Entity task = Entity.newBuilder(validationKey).set("createdAt", infoValidation.getCreatedAt())
				.set("motivo", infoValidation.getMotivo()).set("isValid", infoValidation.getIsValid())
				.set("filename", infoValidation.getFilename()).set("username", infoValidation.getUsername()).build();

		datastore.put(task);

	}

	public List<Validation> list(String username, String filename) {
		List<Validation> infos = new ArrayList<>();
		Query<Entity> query = Query.newEntityQueryBuilder().setKind(Validation.class.getCanonicalName()).setFilter(
				CompositeFilter.and(PropertyFilter.ge("username", username)))
				.build();
//	    .setOrderBy(OrderBy.desc("priority"))
		QueryResults<Entity> tasks = datastore.run(query);
		System.out.println("---");
		while (tasks.hasNext()) {
			Entity task = tasks.next();
			System.out.println(task);
			
			// do something with the task
		}

		System.out.println(query);
		return infos;
	}
}