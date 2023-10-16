/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;



/**
 *
 * @author laura
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bloque{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    
    private Long id;
    
    @ManyToOne
    private Curso curso;
    
    
    
    
}
