package com.j32bit.inviso.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class InvisoException extends RuntimeException {

    private HttpStatus httpStatus;
    private String title;
    private String logMessage;

    public InvisoException(HttpStatus status, String title, String message, String logMessage) {
        super(message);
        this.httpStatus = status;
        this.title = title;
        this.logMessage = logMessage;
    }
    public InvisoException(HttpStatus status, String title, String message) {
        super(message);
        this.httpStatus = status;
        this.title = title;
        this.logMessage = message;
    }
}
