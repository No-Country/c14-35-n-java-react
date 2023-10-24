/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entities;

import com.learning.simplified.dto.BloqueDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author laura
 */

@Entity
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bloque{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;

    @OneToMany
    private List<Leccion> lecciones;

    public Bloque(BloqueDTO bloqueDTO) {
        this.nombre= bloqueDTO.nombre();
        this.lecciones= new ArrayList<>();
    }
    //@ManyToOne
    //private Curso curso;


}
