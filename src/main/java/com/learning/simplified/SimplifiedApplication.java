package com.learning.simplified;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SimplifiedApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimplifiedApplication.class, args);
	}

	/**
	 * Este método es para evitar problemas de CORS.
	 * en donde dice .allowedOrigins, en la url que está entre "" va la url donde esté levantado el frontend
	 * @return
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("*")
						.allowedHeaders("*");
			}
		};
	}

}
