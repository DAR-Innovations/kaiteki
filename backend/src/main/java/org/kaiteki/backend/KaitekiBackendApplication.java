package org.kaiteki.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Locale;
import java.util.TimeZone;

@SpringBootApplication
@EnableAsync
public class KaitekiBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(KaitekiBackendApplication.class, args);
	}

	@PostConstruct
	public void init(){
		// Setting Spring Boot SetTimeZone
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

}
