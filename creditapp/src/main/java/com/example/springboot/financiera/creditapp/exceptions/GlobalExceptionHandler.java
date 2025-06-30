package com.example.springboot.financiera.creditapp.exceptions;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleInvalidFormat(HttpMessageNotReadableException ex) {
        Throwable mostSpecificCause = ex.getMostSpecificCause();

        Map<String, String> error = new HashMap<>();
        if (mostSpecificCause instanceof DateTimeParseException) {
            error.put("fecha_nacimiento", "Formato de fecha inválido. Usa el formato yyyy-MM-dd");
        } else {
            error.put("error", "Error en la solicitud: " + mostSpecificCause.getMessage());
        }

        return ResponseEntity.badRequest().body(error);
    }
}