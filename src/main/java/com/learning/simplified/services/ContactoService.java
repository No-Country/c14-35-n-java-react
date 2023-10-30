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
    
    /*
    public static void crearMensaje(String [] args) {    
      // Recipient's email ID needs to be mentioned.
      String to = "simplifiedlearning46@gmail.com";

      // Sender's email ID needs to be mentioned
      String from = "simplifiedlearning46@gmail.com";

      // Assuming you are sending email from localhost
      String host = "localhost";

      // Get system properties
      Properties properties = System.getProperties();

      // Setup mail server
      properties.setProperty("mail.smtp.host", host);

      // Get the default Session object.
      Session session = Session.getDefaultInstance(properties);

      try {
         // Create a default MimeMessage object.
         MimeMessage message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

         // Set Subject: header field
         message.setSubject("This is the Subject Line!");

         // Now set the actual message
         message.setText("This is actual message");

         // Send message
         Transport.send(message);
         System.out.println("Sent message successfully....");
      } catch (MessagingException mex) {
         mex.printStackTrace();
      }
   }
    
    
    
    

   */
    
    @Autowired
private JavaMailSender mailSender;

public void crearMensaje(String from, String name, String email, String mje, Long phoneNumber) {
    SimpleMailMessage message = new SimpleMailMessage();
  
    message.setFrom(from);
    message.setTo("simplifiedlearning@gmail.com"); // Aquí debes especificar la dirección de correo del destinatario
    message.setSubject("Contacto: " + name);
    message.setText("E-mail: " + email + "\nTeléfono: " + phoneNumber + "\nMensaje: " + mje);
    mailSender.send(message);
}
}

