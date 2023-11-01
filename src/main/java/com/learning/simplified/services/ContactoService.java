/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 *
 * @author laura
 */
@Service
public class ContactoService { 
@Autowired
private JavaMailSender mailSender;

public void crearMensaje(String from, String name, String email, String mje, Long phoneNumber) {
    SimpleMailMessage message = new SimpleMailMessage();
  
    message.setFrom("learningsimplified006@gmail.com");
    message.setTo("learningsimplified006@gmail.com"); // Aquí debes especificar la dirección de correo del destinatario
    message.setSubject("Contacto: " + name);
    message.setText("E-mail: " + email + "\nTeléfono: " + phoneNumber + "\nMensaje: " + mje);
    mailSender.send(message);
}
}

