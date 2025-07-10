package com.example.springboot.financiera.creditapp.auth.filter;

import static com.example.springboot.financiera.creditapp.auth.TokenJwtConfig.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.example.springboot.financiera.creditapp.auth.SimpleGrantedAuthorityJsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
                String header = request.getHeader(HEADER_AUTHORIZATION);

                if(header == null || !header.startsWith(PREFIX_TOKEN)){
                    chain.doFilter(request, response);
                    return;
                }

                String token = header.replace(PREFIX_TOKEN, "");


                try{

                     Claims claims = Jwts
                    .parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
                               
                    String username = claims.getSubject();

                    @SuppressWarnings("unchecked")
                     List<String> authoritiesList = (List<String>) claims.get("authorities");
                       Collection<? extends GrantedAuthority> roles = authoritiesList.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
                        /* 
                Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload();
                String username = claims.getSubject();
                Object authoritiesClaims = claims.get("authorities");

                Collection<? extends GrantedAuthority> roles = Arrays.asList(new ObjectMapper()
                .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                    .readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class) ) ;
                        */
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,null, roles);

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                chain.doFilter(request, response);
                }catch(JwtException e){

                    Map<String, String> body= new HashMap<>();
                    body.put("error", e.getMessage());
                    body.put("message", "Token invalido!");

                    response.getWriter().write(new ObjectMapper().writeValueAsString(body));
                     response.setStatus(401);
                    response.setContentType(CONTENT_TYPE);


                }
    }

    

}
