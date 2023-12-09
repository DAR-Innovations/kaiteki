package org.kaiteki.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class KaitekiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(KaitekiBackendApplication.class, args);
	}

}
