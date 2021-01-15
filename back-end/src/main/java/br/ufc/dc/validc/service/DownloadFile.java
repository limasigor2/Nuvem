package br.ufc.dc.validc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.exception.FileStorageException;

@Service
public class DownloadFile {
	@Value("${app.awsServices.bucketName}")
	private String bucketName;

	@Value("${app.awsServices.clientRegion}")
	private String regionName;

	@Value("${app.awsServices.accessKey}")
	private String accessKey;

	@Value("${app.awsServices.secretKey}")
	private String secretKey;
	
	public byte[] get(String userName, String fileName) throws EntityNotFoundException, FileStorageException {
		if(fileName.contains("..")) {
			throw new FileStorageException("file.invalid.path", "Filename contains invalid path sequence " + fileName);
		}
		BasicAWSCredentials credentialsProvider = new BasicAWSCredentials(accessKey, secretKey);
		Regions clientRegion = Regions.fromName(regionName);
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
				.withCredentials(new AWSStaticCredentialsProvider(credentialsProvider)).build();
		
		S3Object fullObject;
		System.out.println("Downloading file");
		try {
			fullObject = s3Client.getObject(new GetObjectRequest(bucketName, userName + "/" +fileName));
			S3ObjectInputStream inputStream = fullObject.getObjectContent();
			return IOUtils.toByteArray(inputStream);
		}catch (Exception e) {
			throw new EntityNotFoundException("aws.file.notfound", "Arquivo " + fileName + " não escontrado na amazon");
		}
		
		
		
	}

	
	
}
