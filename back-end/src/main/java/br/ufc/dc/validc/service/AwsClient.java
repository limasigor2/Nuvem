package br.ufc.dc.validc.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.util.IOUtils;

import br.ufc.dc.validc.exception.EntityNotFoundException;
import br.ufc.dc.validc.exception.FileStorageException;
import br.ufc.dc.validc.exception.ValidcException;
import br.ufc.dc.validc.model.Message;

@Component
public class AwsClient {

	@Value("${cloud.aws.bucketName}")
	private String bucketName;

	@Value("${cloud.aws.region.static}")
	private String regionName;

	@Value("${cloud.aws.credentials.accessKey}")
	private String accessKey;

	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey;

	@Value("${cloud.aws.credentials.sessionToken}")
	private String sessionToken;

	public byte[] get(String userName, String fileName) throws EntityNotFoundException, FileStorageException {
		if (fileName.contains("..")) {
			throw new FileStorageException("file.invalid.path", "Filename contains invalid path sequence " + fileName);
		}
		
		BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey,
				sessionToken);
		Regions clientRegion = Regions.fromName(regionName);
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
				.withCredentials(new AWSStaticCredentialsProvider(sessionCredentials)).build();
		
		
//		BasicAWSCredentials credentialsProvider = new BasicAWSCredentials(accessKey, secretKey);
//		Regions clientRegion = Regions.fromName(regionName);
//		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
//				.withCredentials(new AWSStaticCredentialsProvider(credentialsProvider)).build();

		S3Object fullObject;
		System.out.println("Downloading file");
		try {
			fullObject = s3Client.getObject(new GetObjectRequest(bucketName, userName + "/" + fileName));
			S3ObjectInputStream inputStream = fullObject.getObjectContent();
			return IOUtils.toByteArray(inputStream);
		} catch (Exception e) {
			throw new EntityNotFoundException("aws.file.notfound", "Arquivo " + fileName + " não escontrado na amazon");
		}
	}

	public void send(File file, String username, String fileName) throws IOException {
		Regions clientRegion = Regions.fromName(regionName);

		try {

			BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey,
					sessionToken);

			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
					.withCredentials(new AWSStaticCredentialsProvider(sessionCredentials)).build();

//			BasicAWSCredentials credentialsProvider = new BasicAWSCredentials(accessKey, secretKey);
//
//			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
//					.withCredentials(new AWSStaticCredentialsProvider(credentialsProvider)).build();

			// Upload a file as a new object with ContentType and title specified.
			PutObjectRequest request = new PutObjectRequest(bucketName, username + '/' + fileName, file);
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType("plain/text");
			metadata.addUserMetadata("title", "someTitle");
			request.setMetadata(metadata);
			s3Client.putObject(request);
		} catch (AmazonServiceException e) {
			// The call was transmitted successfully, but Amazon S3 couldn't process
			// it, so it returned an error response.
			e.printStackTrace();
		} catch (SdkClientException e) {
			// Amazon S3 couldn't be contacted for a response, or the client
			// couldn't parse the response from Amazon S3.
			e.printStackTrace();
		}
	}

	public void delete(String username, String filename) throws FileStorageException {
		if (filename.contains("..")) {
			throw new FileStorageException("file.invalid.path", "Filename contains invalid path sequence " + filename);
		}
		Regions clientRegion = Regions.fromName(regionName);

		try {
			BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey,
					sessionToken);

			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
					.withCredentials(new AWSStaticCredentialsProvider(sessionCredentials)).build();
			
			s3Client.deleteObject(new DeleteObjectRequest(bucketName, username + "/" + filename));
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	public ArrayList<String> list(String username) throws ValidcException {
		Regions clientRegion = Regions.fromName(regionName);

		try {
			ArrayList<String> records = new ArrayList<>();
//			BasicAWSCredentials credentialsProvider = new BasicAWSCredentials(accessKey, secretKey);
//
//			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
//					.withCredentials(new AWSStaticCredentialsProvider(credentialsProvider)).build();
			BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey,
					sessionToken);

			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
					.withCredentials(new AWSStaticCredentialsProvider(sessionCredentials)).build();

			ListObjectsRequest listObjectsRequest = new ListObjectsRequest().withBucketName(bucketName)
					.withPrefix(username + "/");

			ObjectListing objects = s3Client.listObjects(listObjectsRequest);
			for (;;) {
				List<S3ObjectSummary> summaries = objects.getObjectSummaries();
				if (summaries.size() < 1) {
					break;
				}

				for (int i = 0; i < summaries.size(); i++) {
					ArrayList<String> file = new ArrayList<>();

					file.add(summaries.get(i).getKey());
					records.addAll(file);
				}

				objects = s3Client.listNextBatchOfObjects(objects);
			}
			return records;
		} catch (Exception e) {
			// TODO: handle exception
			throw new ValidcException(HttpStatus.INTERNAL_SERVER_ERROR, "cloud.aws.error",
					"Não foi possível listar os objetos");
		}
	}

}
