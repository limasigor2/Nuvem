package br.ufc.dc.validc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.ufc.validc.property.FileStorageProperties;


@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class ValiDcApplication {

	public static void main(String[] args) {
		SpringApplication.run(ValiDcApplication.class, args);
	}
	
	

}
