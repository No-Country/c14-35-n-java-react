package com.learning.simplified.exceptions;

public class BadDataEntryException extends RuntimeException{
    public  BadDataEntryException(String mensaje){
        super(mensaje);
    }
}
