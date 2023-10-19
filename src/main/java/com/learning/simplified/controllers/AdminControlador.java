/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author laura
 */
@RequestMapping("/admin")
@Controller
public class AdminControlador {
    
    @GetMapping("/dashboard")
    public String panelAdministrativo(){
        return "Eres administrador";
    }
}
