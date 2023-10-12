/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;



/**
 *
 * @author laura
 */
@Entity
public class Rol {
    @Id
    private Long id; 
    private Boolean estudiante;
    private Boolean educador;
    private Boolean administrador; 

}
