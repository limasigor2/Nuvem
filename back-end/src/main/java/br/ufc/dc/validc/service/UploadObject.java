package br.ufc.dc.validc.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UploadObject {

	@Value("${app.awsServices.bucketName}")
	private String bucketName;

	@Value("${app.awsServices.clientRegion}")
	private String regionName;

	@Value("${app.awsServices.accessKey}")
	private String accessKey;

	@Value("${app.awsServices.secretKey}")
	private String secretKey;

	public void send(File file, String username,  String fileName) throws IOException {
		Regions clientRegion = Regions.fromName(regionName);

		try {
			BasicAWSCredentials credentialsProvider = new BasicAWSCredentials(accessKey, secretKey);

			AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
					.withCredentials(new AWSStaticCredentialsProvider(credentialsProvider)).build();

			// Upload a file as a new object with ContentType and title specified.
			PutObjectRequest request = new PutObjectRequest(bucketName, username + '/' +fileName, file);
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
}