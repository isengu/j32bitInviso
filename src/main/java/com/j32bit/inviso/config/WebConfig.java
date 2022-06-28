package com.j32bit.inviso.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        /*Intercepts below endpoints, then logs request and response dates along with username*/
        registry.addInterceptor(new EndpointInterceptor())
                .addPathPatterns("/api/**");
    }

    // https://stackoverflow.com/a/27383522/13891083
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/admin").setViewName("forward:/admin/index.html");
    }
}
