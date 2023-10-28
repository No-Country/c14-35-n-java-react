package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.DatosLoginDTO;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.exceptions.MyException;

import com.learning.simplified.services.UsuarioService;
import jakarta.servlet.http.HttpSession;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/")
public class PortalControlador {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/test")
    public String pruebaMartin() {
        return "api en funcionamiento";
    }

    @GetMapping("/prueba")
    public String prueba() {
        return "probando postman";
    }

    @PostMapping("/registro")
    public String registro(@RequestParam String nombre, @RequestParam String email,
            @RequestParam String password, @RequestParam String password2, MultipartFile archivo) {
        try {
            usuarioService.registrar(nombre, email, password, password2, archivo);

            return "registro exitoso";
        } catch (MyException ex) {

            return ex.getMessage();
        }
    }

    @GetMapping("/login")
    public ResponseEntity<DatosLoginDTO> login(@RequestParam String email, String password) {
        try {
            Usuario usuario = usuarioService.validarLogin(email, password);
            DatosLoginDTO datosLoginDTO= new DatosLoginDTO(usuario.getId(), usuario.getNombre(), usuario.getApellido(),
                    usuario.getEmail(), usuario.getAlta(), usuario.getRol(), usuario.getCurso(), usuario.getImagen());
            return ResponseEntity.ok().body(datosLoginDTO);
        } catch (MyException ex) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/perfil")
    public String inicio(HttpSession session) {
        System.out.println(session.toString());
        Usuario logueado = (Usuario) session.getAttribute("usuariosession");
        if (logueado.getRol().toString().equals("ADMIN")) {
            return "Usuario logueado como admin";
        }
        return "Usuario logueado como estudiante";
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PostMapping("/perfil/{id}")
    public String actualizar(@PathVariable Long id, @RequestParam String nombre, @RequestParam String email,
            @RequestParam String password, @RequestParam String password2, MultipartFile archivo) {

        try {
            usuarioService.actualizar(id, nombre, email, password, password2, archivo);
            return "Perfil actualizado correctamente"; 
        } catch (Exception ex) {
            Logger.getLogger(PortalControlador.class.getName()).log(Level.SEVERE, null, ex);
        
        return "Perfil no actualizado"; 
    }
    }

}
