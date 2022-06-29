package com.j32bit.inviso.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtTokenUtil {

    private static final int EXPIRATION_MILLISECONDS = 30 * 60 * 1000;

    @Value("${info.app.jwt.secret}")
    private String secret;

    /**
     * Generate jwt token with given username.
     *
     * @param username username.
     * @return JWT token.
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date((System.currentTimeMillis() + EXPIRATION_MILLISECONDS)))
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    /**
     * Refresh given token.
     *
     * @param token token.
     * @return refreshed token.
     */
    public String refresh(String token) {
        Claims claims = getAllClaimsFromToken(token);

        return Jwts.builder()
                .addClaims(claims)
                .setExpiration(new Date((System.currentTimeMillis() + EXPIRATION_MILLISECONDS)))
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    /**
     * Validate given token for expiration.
     *
     * @param token token.
     * @return {@link Boolean}.
     */
    public boolean validateToken(String token) {
        return !isExpired(token);
    }

    /**
     * Extract username out of given token.
     *
     * @param token token.
     * @return username.
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Extract expritaion date from given token.
     *
     * @param token token.
     * @return expiration date.
     */
    public Date getExpirationFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * Decide whether given token is expired.
     *
     * @param token token.
     * @return {@link Boolean}.
     */
    public boolean isExpired(String token) {
        return !(new Date().before(getExpirationFromToken(token)));
    }

    /**
     * Extract required information out of given token.
     *
     * @param token token.
     * @param claimsResolver claim resolver.
     * @return extracted info.
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all the information out of given token.
     *
     * @param token token.
     * @return informations.
     * @throws ExpiredJwtException expried token exception.
     */
    private Claims getAllClaimsFromToken(String token) throws ExpiredJwtException {
            return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

}