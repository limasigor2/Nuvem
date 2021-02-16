package br.ufc.dc.validc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@EnableAutoConfiguration
public class ValiDcApplication {

	public static void main(String[] args) {
		SpringApplication.run(ValiDcApplication.class, args);
	}

}
