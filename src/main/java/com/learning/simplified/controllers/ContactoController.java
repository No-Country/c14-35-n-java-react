/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.controllers;

import com.learning.simplified.entities.Contacto;
import com.learning.simplified.services.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactoController {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    ContactoService contactoService;

    @PostMapping("/contact")
    public ResponseEntity<Contacto> enviarMensaje(@RequestBody Contacto contacto) {
        String from = "simplifiedlearning46@gmail.com";
        contactoService.crearMensaje(from, contacto.getName(), contacto.getEmail(), contacto.getMessage(), contacto.getPhoneNumber());

        return ResponseEntity.ok().body(contacto);
    }

    /*
    @PostMapping("/contact")
    public ResponseEntity<Contacto> enviarMensaje(@RequestBody String name,String email, String message,Long phoneNumber){
        Contacto contacto = new Contacto(); 
        String from="simplifiedlearning46@gmail.com"; 
        contactoService.crearMensaje( from, name, email, message, phoneNumber);
       
        contacto.setEmail(email);
        contacto.setMessage(message);
        contacto.setPhoneNumber(phoneNumber);
        contacto.setName(name);
             
        return ResponseEntity.ok().body(contacto);
        
    }*/
}
