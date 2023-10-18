/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.repository;

import com.learning.simplified.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

/**
 *
 * @author laura
 */

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   
    Usuario findByEmail(String email);
     
}