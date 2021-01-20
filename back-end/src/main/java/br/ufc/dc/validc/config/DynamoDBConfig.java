package br.ufc.dc.validc.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

@Configuration
public class DynamoDBConfig {

	@Value("${cloud.aws.credentials.accessKey}")
	private String awsAccessKey;

	@Value("${cloud.aws.credentials.secretKey}")
	private String awsSecretKey;

	@Value("${cloud.aws.region.static}")
	private String awsRegion;

	@Value("${cloud.aws.dynamodb.endpoint}")
	private String awsDynamoDBEndPoint;

	@Value("${cloud.aws.credentials.sessionToken}")
	private String sessionToken;

	@Bean
	public DynamoDBMapper mapper() {

		return new DynamoDBMapper(amazonDynamoDBConfig());
	}

	public AmazonDynamoDB amazonDynamoDBConfig() {
		
		BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(awsAccessKey, awsSecretKey,
				sessionToken);
		return AmazonDynamoDBClientBuilder.standard().withEndpointConfiguration(null)
				.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(awsDynamoDBEndPoint, awsRegion))
				.withCredentials(new AWSStaticCredentialsProvider(sessionCredentials)).build();

	}
}
