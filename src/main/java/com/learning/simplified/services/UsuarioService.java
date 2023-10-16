package com.learning.simplified.services;



import com.learning.simplified.entities.Usuario;
import com.learning.simplified.enumeraciones.Rol;
import com.learning.simplified.exceptions.MyException;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author laura
 */
@Service
public class UsuarioService implements UserDetailsService{
    @Autowired
    private UsuarioRepository usuarioRepository;
 

   @Transactional
    public void registrar(String nombre, String email, String password, String password2) throws MyException{
        
        validar(nombre, email, password, password2);
        
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(new BCryptPasswordEncoder().encode(password));
        usuario.setRol(Rol.USER);
        
        usuarioRepository.save(usuario);
    }
    
    private void validar(String nombre, String email, String password, String password2) throws MyException{
        
        if(nombre.isEmpty() || nombre == null){
            throw new MyException("El nombre no puede ser nulo ni vacio");
        }
        
        if(email.isEmpty() || email == null){
            throw new MyException("El email no puede ser nulo ni vacio");
        }
        
        if(password.isEmpty() || password == null || password.length() <= 7){
            throw new MyException("La contraseña no puede ser nula, estar vacía o ser menos a 8 digitos");
        }
        
        if(!password.equals(password2) ){
            throw new MyException("Las contraseñas contraseñas no coinciden");
        }
    }
    
    
    
    
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Usuario usuario = usuarioRepository.findByEmail(email);
        
        if (usuario != null) {
            
            List<GrantedAuthority> permisos = new ArrayList();
            
            GrantedAuthority p = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().toString());
            
            permisos.add(p);
            
            return new User(usuario.getEmail(),usuario.getPassword(),permisos);
        }else{
            return null;
        }
    }

  
    
    /*    
    
   public RespuestaUsuarioDTO login(DatosLoginUsuarioDTO datosLoginUsuarioDTO) {
        Usuario usuarioRecibido = new Usuario(datosLoginUsuarioDTO);
        Usuario usuarioEncontrado = usuarioRepository.findByEmail(usuarioRecibido.getEmail());

        if(usuarioEncontrado == null){
            throw new RuntimeException("Usuario no encontrado en la base de datos");
        }

        if(!usuarioRecibido.getPassword().equals(usuarioEncontrado.getPassword())){
            throw new RuntimeException("La contraseña ingresada es incorrecta");
        }


        return new RespuestaUsuarioDTO(usuarioEncontrado.getNombre(), usuarioEncontrado.getApellido(), usuarioEncontrado.getEmail(), usuarioEncontrado.getAlta(), new RolDTO(usuarioEncontrado.getRol().getEstudiante(), usuarioEncontrado.getRol().getEducador(),usuarioEncontrado.getRol().getAdministrador()));
    }

  


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

*/
   
    
}
