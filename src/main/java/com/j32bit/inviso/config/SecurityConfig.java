package com.j32bit.inviso.config;

import com.j32bit.inviso.security.InvisoDaoAuthenticationProvider;
import com.j32bit.inviso.security.JwtSecurityFilter;
import com.j32bit.inviso.service.InvisoUserDetailsService;
import com.j32bit.inviso.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final JwtSecurityFilter jwtSecurityFilter;
    private final ExceptionHandlerFilter exceptionHandlerFilter;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        InvisoDaoAuthenticationProvider invisoDaoAuthenticationProvider = new InvisoDaoAuthenticationProvider();
        invisoDaoAuthenticationProvider.setUserDetailsService(userDetailsService());
        invisoDaoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        invisoDaoAuthenticationProvider.setHideUserNotFoundExceptions(false);
        return invisoDaoAuthenticationProvider;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.addAllowedHeader("Token");
        configuration.addExposedHeader("Token");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    @Bean
    public UserDetailsService userDetailsService() {
        return new InvisoUserDetailsService(userService);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception
    {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/authentication/token").permitAll()
                .antMatchers("/api/test").permitAll()
                .antMatchers("/api/test/**").permitAll()
                .antMatchers("/api/dashboard/**").hasRole("ADMIN")
                .antMatchers("/api/application/**").hasRole("ADMIN")
                .antMatchers("/api/**").authenticated()
                .antMatchers("/actuator/**").permitAll();

        http.cors().and().csrf().disable();

        http.addFilterBefore(exceptionHandlerFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class);

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

}
