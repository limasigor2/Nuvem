//package br.ufc.dc.validc.service;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.List;
//
//import javax.annotation.PostConstruct;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.amazonaws.auth.AWSCredentials;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//
//@Service
//public class AmazonClient {
//
//	private AmazonS3 s3client;
//
//	@Value("${amazonProperties.endpointUrl}")
//	private String endpointUrl;
//	
//	@Value("${amazonProperties.bucketName}")
//	private String bucketName;
//	
//	@Value("${amazonProperties.accessKey}")
//	private String accessKey;
//	
//	@Value("${amazonProperties.secretKey}")
//	private String secretKey;
//
//	@PostConstruct
//	private void initializeAmazon() {
//		AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
//		this.s3client = new AmazonS3Client(credentials);
//	}
//
//	private Logger log = LoggerFactory.getLogger(AmazonClient.class);
//

//	private String bucketName = "validc";
//	
//	public void uploadMultipleFiles(List<MultipartFile> files) {
//		if(files != null) {
//			System.out.println("entrei");
//			files.forEach(multipartFile -> {
//				File file = convertMultiPartFileToFile(multipartFile);
//				String uniqueFileName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
//				uploadFileToS3bucket(uniqueFileName, file, bucketName);
//			});
//		}
//		
//	}
//	private void uploadFileToS3bucket(String fileName, File file, String bucketName) {
//		amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, file));
//	}
//	
//	private File convertMultiPartFileToFile(MultipartFile file) {
//		File convertedFile = new File(file.getOriginalFilename());
//		try(FileOutputStream fos = new FileOutputStream(convertedFile)) {
//			fos.write(file.getBytes());
//		}catch(IOException ioException) {
//			log.error("Error converting multipartFile to file",ioException);
//		}
//		return convertedFile;
//	}

//}
