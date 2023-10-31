package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.DatosLoginDTO;
import com.learning.simplified.dto.UsuarioLoginDTO;
import com.learning.simplified.dto.UsuarioRegistroDTO;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.exceptions.MyException;

import com.learning.simplified.services.UsuarioService;
import jakarta.servlet.http.HttpSession;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

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


    //registro viejo "params"

    /*

    @PostMapping("/registro")
    public String registro(@RequestParam String nombre, @RequestParam String email,
            @RequestParam String password, @RequestParam String password2, ) {
        try {
            usuarioService.registrar(nombre, email, password, password2, archivo);

            return "registro exitoso";
        } catch (MyException ex) {

            return ex.getMessage();
        }
    }

     */

    @PostMapping("/registro")
    public String registro(@RequestBody UsuarioRegistroDTO usuarioRegistroDTO) {

        try {
            usuarioService.registrar(
                    usuarioRegistroDTO.getNombre(),usuarioRegistroDTO.getApellido(), usuarioRegistroDTO.getEmail(),
                    usuarioRegistroDTO.getPassword(), usuarioRegistroDTO.getPassword2(),usuarioRegistroDTO.getRol());

            return "registro exitoso";
        } catch (MyException ex) {

            return ex.getMessage();
        }
    }


    //login con params
    /*
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

     */

    //login usando el body
    @PostMapping("/login")
    public ResponseEntity<DatosLoginDTO> login(@RequestBody UsuarioLoginDTO usuarioLoginDTO) {
        try {
            Usuario usuarioValidado = usuarioService.validarLogin(usuarioLoginDTO.getEmail(), usuarioLoginDTO.getPassword());
            //martin: no entiendo esta parte
            DatosLoginDTO datosLoginDTO = new DatosLoginDTO(usuarioValidado.getId(), usuarioValidado.getNombre(), usuarioValidado.getApellido(),
                    usuarioValidado.getEmail(), usuarioValidado.getAlta(), usuarioValidado.getRol(), usuarioValidado.getCurso(), usuarioValidado.getImagen());
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
