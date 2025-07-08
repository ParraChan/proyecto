package com.example.springboot.financiera.creditapp.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.springboot.financiera.creditapp.auth.filter.JwtAuthenticationFilter;
import com.example.springboot.financiera.creditapp.auth.filter.JwtValidationFilter;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        return http.authorizeHttpRequests( authz -> 
        authz
        
        .requestMatchers(HttpMethod.GET,"/api/clientes").permitAll()
        //.requestMatchers(HttpMethod.GET,"/api/clientes").hasAnyRole("CAPTURISTA","SUPERVISOR")
        .requestMatchers(HttpMethod.GET,"/api/clientes/{id}").hasAnyRole("CAPTURISTA","SUPERVISOR")
        .requestMatchers(HttpMethod.POST, "/api/clientes").hasRole("CAPTURISTA")
        .requestMatchers(HttpMethod.PUT, "/api/clientes/{id}").hasRole("CAPTURISTA")
        .requestMatchers(HttpMethod.DELETE, "/api/clientes/{id}").hasRole("CAPTURISTA")

        .requestMatchers(HttpMethod.GET,"/api/creditos").hasAnyRole("CAPTURISTA","SUPERVISOR")
        .requestMatchers(HttpMethod.GET,"/api/creditos/{id}").hasAnyRole("CAPTURISTA","SUPERVISOR")
        .requestMatchers(HttpMethod.POST, "/api/creditos").hasRole("CAPTURISTA")
        .requestMatchers(HttpMethod.PUT, "/api/creditos/{id}").hasAnyRole("CAPTURISTA","SUPERVISOR")
        .requestMatchers(HttpMethod.DELETE, "/api/creditos/{id}").hasRole("CAPTURISTA")

        .requestMatchers(HttpMethod.GET,"/api/usuarios").hasRole("SUPERVISOR")
        .requestMatchers(HttpMethod.GET,"/api/usuarios/{id}").hasRole("SUPERVISOR")
        .requestMatchers(HttpMethod.POST, "/api/usuarios").hasRole("SUPERVISOR")
        .requestMatchers(HttpMethod.PUT, "/api/usuarios/{id}").hasRole("SUPERVISOR")
        .requestMatchers(HttpMethod.DELETE, "/api/usuarios/{id}").hasRole("SUPERVISOR")


        

            .anyRequest().authenticated())
        .cors(cors-> cors.configurationSource(configurationSource()))
        .addFilter(new JwtAuthenticationFilter(authenticationManager()))
        .addFilter(new JwtValidationFilter(authenticationManager()))
        .csrf(config -> config.disable())
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
    }

    @Bean
    CorsConfigurationSource configurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));

        config.setAllowedMethods(Arrays.asList("POST","GET","PUT","DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
        
    }
    @Bean
    FilterRegistrationBean<CorsFilter> corsFilter(){
        FilterRegistrationBean<CorsFilter> corsBean = new FilterRegistrationBean<CorsFilter>(
            new CorsFilter(this.configurationSource()));
        corsBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return corsBean;
    }

}
