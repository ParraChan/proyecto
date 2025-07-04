package com.example.springboot.financiera.creditapp.exceptions;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        String message = ex.getMessage();
        Map<String, String> error = new HashMap<>();

        /*if (message.contains("correo")) {
            error.put("email", message);
        } else */if (message.contains("usuario")) {
            error.put("nombreusuario", message);
        } else {
            error.put("error", message);
        }

        return ResponseEntity.badRequest().body(error);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    
    ex.getBindingResult().getAllErrors().forEach(error -> {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
    });

    return ResponseEntity.badRequest().body(errors);
}
}