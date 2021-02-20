package br.ufc.dc.validc.repository;

import java.util.ArrayList;
import java.util.List;

import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;

import br.ufc.dc.validc.model.Validation;

@Component
public class ValidationRepository {

	@Value("${cloud.google.project-id}")
	private String projectId;

	Datastore datastore = DatastoreOptions.newBuilder().setProjectId(projectId).build().getService();

	public void save(Validation infoValidation) {
		Key validationKey = datastore.newKeyFactory().setKind(Validation.class.getCanonicalName())
				.newKey(infoValidation.getId());
		Entity task = Entity.newBuilder(validationKey).set("createdAt", infoValidation.getCreatedAt())
				.set("motivo", infoValidation.getMotivo()).set("isValid", infoValidation.getIsValid())
				.set("filename", infoValidation.getFilename()).set("username", infoValidation.getUsername()).build();

		datastore.put(task);

	}

	public List<Validation> list(String username, String filename) {

		Query<Entity> query = Query.newEntityQueryBuilder().setKind(Validation.class.getCanonicalName())
				.setFilter(PropertyFilter.eq("username", username)).setFilter(PropertyFilter.eq("filename", filename))
				.build();
		QueryResults<Entity> results = datastore.run(query);
		List<Validation> infos = new ArrayList<>();
		while (results.hasNext()) {

			Entity entity = results.next();
			Validation validation = new Validation();
			validation.setCreatedAt(entity.getString("createdAt"));
			validation.setMotivo(entity.getString("motivo"));
			validation.setFilename(entity.getString("filename"));
			validation.setIsValid(entity.getBoolean("isValid"));
			validation.setUsername(entity.getString("username"));
			infos.add(validation);
			System.out.println(entity);

		}
		System.out.println(infos.size());

		return infos;
	}
}