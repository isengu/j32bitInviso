package com.j32bit.inviso;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@PropertySource("classpath:application-${spring.profiles.active:default}.properties")
public class InvisoApplication {

    @Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

    @Bean
    public PasswordEncoder passwordEncoder(){
      return NoOpPasswordEncoder.getInstance();
    }

    public static void main(String[] args) {
        SpringApplication.run(InvisoApplication.class, args);
    }

}
