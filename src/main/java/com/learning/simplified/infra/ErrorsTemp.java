package com.learning.simplified.infra;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ErrorsTemp {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity err404(){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity err400(MethodArgumentNotValidException e){
        //var err = e.getFieldError(); //Muestra solo el ultimo error
        List err = e.getFieldErrors().stream().map(errorResponseDTO::new).toList();

        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity err400(HttpMessageNotReadableException e){
        String err = e.getMessage(); //Mensaje de error
        return ResponseEntity.badRequest().body(new errorResponseDTO("datos", "El body con los datos recibidos está vacío"));
    }



    private record errorResponseDTO(String campo, String err_message){
        public errorResponseDTO(FieldError error){
            this(error.getField(), error.getDefaultMessage());
        }
    };


}
