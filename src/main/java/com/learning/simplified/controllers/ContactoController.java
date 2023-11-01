
package com.learning.simplified.controllers;

import com.learning.simplified.entities.Contacto;
import com.learning.simplified.services.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class ContactoController {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    ContactoService contactoService;

    @PostMapping("/contact")
    public ResponseEntity<Contacto> enviarMensaje(@RequestBody Contacto contacto) {
        
        String from= "learningsimplified006@gmail.com"; 
        
        contactoService.crearMensaje(from, contacto.getName(), contacto.getEmail(), contacto.getMessage(), contacto.getPhoneNumber());

        return ResponseEntity.ok().body(contacto);
    }
}
