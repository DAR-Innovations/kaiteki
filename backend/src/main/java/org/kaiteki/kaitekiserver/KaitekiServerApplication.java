package org.kaiteki.kaitekiserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class KaitekiServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(KaitekiServerApplication.class, args);
	}

}
