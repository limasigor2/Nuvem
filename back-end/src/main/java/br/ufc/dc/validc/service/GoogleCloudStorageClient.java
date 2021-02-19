package br.ufc.dc.validc.service;

import com.google.cloud.storage.Bucket;
import com.google.api.gax.paging.Page;


import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class GoogleCloudStorageClient {

	@Value("${cloud.google.project-id}")
	private String projectId;

	@Value("${cloud.google.bucket-name}")
	private String bucketName;

//	@Value("${google.credentials.location}")
//	private String credentialLocation;
	
	Storage storage = StorageOptions.getDefaultInstance().getService();

	public void uploadObject(MultipartFile file, String username) throws IOException {

		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
//				.setCredentials(GoogleCredentials.fromStream(new FileInputStream(credentialLocation))).build()
//				.getService();
		BlobId blobId = BlobId.of(bucketName, username + "/" + file.getOriginalFilename());
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
		storage.create(blobInfo, file.getBytes());
	}

	public void deleteObject(String filename, String username) throws IOException {
		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
//				.setCredentials(GoogleCredentials.fromStream(new FileInputStream(credentialLocation))).build()
//				.getService();
		System.out.println(bucketName + "\t" + username + "/" + filename);
		storage.delete(bucketName, username + "/" + filename);
	}

	public byte[] get(String username, String filename) throws IOException {
		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
//				.setCredentials(GoogleCredentials.fromStream(new FileInputStream(credentialLocation))).build()
//				.getService();
		return storage.get(BlobId.of(bucketName, username + "/" + filename)).getContent();
	}

	public ArrayList<String> list(String username) throws IOException {
		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
//				.setCredentials(GoogleCredentials.fromStream(new FileInputStream(credentialLocation))).build()
//				.getService();

		Bucket bucket = storage.get(bucketName);
		Page<Blob> blobs = bucket.list(Storage.BlobListOption.prefix(username + "/"),
				Storage.BlobListOption.currentDirectory());

		ArrayList<String> filenames = new ArrayList<>();

		for (Blob blob : blobs.iterateAll()) {
			filenames.add(blob.getName());
		}

		return filenames;
	}

}
