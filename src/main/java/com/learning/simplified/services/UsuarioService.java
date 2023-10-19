package com.learning.simplified.services;

import com.learning.simplified.entities.Imagen;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.enumeraciones.Rol;
import com.learning.simplified.exceptions.MyException;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author laura
 */
@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ImagenService imagenService;

    @Transactional
    public void registrar(String nombre, String email, String password, String password2, MultipartFile archivo) throws MyException {

        validar(nombre, email, password, password2);

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(new BCryptPasswordEncoder().encode(password));
        usuario.setRol(Rol.USER);

        Imagen imagen = imagenService.guardarImagen(archivo);
        usuario.setImagen(imagen);

        usuarioRepository.save(usuario);
    }
    
    
       @Transactional
    public void actualizar (Long id, String nombre, String email, String password, String password2, MultipartFile archivo) throws Exception {

        validar(nombre, email, password, password2);
        
   

        Optional<Usuario> respuesta = usuarioRepository.findById(id);
        if (respuesta.isPresent()) {

            Usuario usuario = respuesta.get();
            usuario.setNombre(nombre);
            usuario.setEmail(email);

            usuario.setPassword(new BCryptPasswordEncoder().encode(password));

            usuario.setRol(Rol.USER);
            
            String idImagen = null;
            
            if (usuario.getImagen() != null) {
                idImagen = usuario.getImagen().getId();
            }
            
            Imagen imagen = imagenService.actualizar(archivo, idImagen);
            
            usuario.setImagen(imagen);
            
            usuarioRepository.save(usuario);
        }

    }
    
      
    public Usuario getOne(Long id){
        return usuarioRepository.getOne(id);
    }
    
    @Transactional(readOnly=true)
    public List<Usuario> listarUsuarios() {

        List<Usuario> usuarios = new ArrayList();

        usuarios = usuarioRepository.findAll();

        return usuarios;
    }
    
    @Transactional
    public void cambiarRol(Long id){
        
        Optional<Usuario> respuesta = usuarioRepository.findById(id);
    	
    	if(respuesta.isPresent()) {
    		
    		Usuario usuario = respuesta.get();
    		
    		if(usuario.getRol().equals(Rol.USER)) {
    			
    		usuario.setRol(Rol.ADMIN);
    		
    		}else if(usuario.getRol().equals(Rol.ADMIN)) {
    			usuario.setRol(Rol.USER);
    		}
    	}
    }
    
    

    private void validar(String nombre, String email, String password, String password2) throws MyException {

        if (nombre.isEmpty() || nombre == null) {
            throw new MyException("El nombre no puede ser nulo ni vacio");
        }

        if (email.isEmpty() || email == null) {
            throw new MyException("El email no puede ser nulo ni vacio");
        }

        if (password.isEmpty() || password == null || password.length() <= 7) {
            throw new MyException("La contraseña no puede ser nula, estar vacía o ser menos a 8 digitos");
        }

        if (!password.equals(password2)) {
            throw new MyException("Las contraseñas contraseñas no coinciden");
        }
    }

    public void validarLogin(String email, String password) throws MyException {


        Usuario usuarioEncontrado = usuarioRepository.findByEmail(email);
        //desencripta el password guardado en base de datos
        boolean p = new BCryptPasswordEncoder().matches(password, usuarioEncontrado.getPassword());

        if (!email.equals(usuarioEncontrado.getEmail())) {
            throw new MyException("Usuario no encontrado en la base de datos");
        }

        if (!p) {
            throw new RuntimeException("La contraseña ingresada es incorrecta");
        }

        if (email.equals(usuarioEncontrado.getEmail())  & p) {
            throw new MyException("Login correcto, ingresando");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario != null) {

            List<GrantedAuthority> permisos = new ArrayList();

            GrantedAuthority p = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().toString());

            permisos.add(p);

            ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();

            HttpSession session = attr.getRequest().getSession(true);

            session.setAttribute("usuariosession", usuario);

            return new User(usuario.getEmail(), usuario.getPassword(), permisos);
        } else {
            return null;
        }
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

 */
