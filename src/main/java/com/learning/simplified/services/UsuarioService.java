package com.learning.simplified.services;


import com.learning.simplified.entities.Curso;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.repository.CursoRepository;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import com.learning.simplified.entities.Imagen;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.enumeraciones.Rol;
import com.learning.simplified.exceptions.MyException;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
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
    private CursoRepository cursoRepository;
    @Autowired
    private CursoService cursoService;

    @Autowired
    private ImagenService imagenService;

    @Transactional
    public void registrar(String nombre,String apellido, String email, String password, String password2, Rol rol) throws MyException {

        validar(nombre, email, password, password2);

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setEmail(email);
        usuario.setPassword(new BCryptPasswordEncoder().encode(password));
        usuario.setRol(rol);
        usuario.setAlta(LocalDate.now());
        //Imagen imagen = imagenService.guardarImagen(archivo);
        // usuario.setImagen(imagen);

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

            usuario.setRol(Rol.ADMIN);
            
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

    public Usuario findUserById(Long id) {
        return usuarioRepository.getReferenceById(id);
    }

    @Transactional //(readOnly=true) //TODO Revisar por qué da error
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

    public Usuario validarLogin(String email, String password) throws MyException {


        Usuario usuarioEncontrado = usuarioRepository.findByEmail(email);
        //desencripta el password guardado en base de datos
        boolean p = new BCryptPasswordEncoder().matches(password, usuarioEncontrado.getPassword());

        if (!email.equals(usuarioEncontrado.getEmail())) {
            throw new MyException("Usuario no encontrado en la base de datos");
        }

        if (!p) {
            throw new RuntimeException("La contraseña ingresada es incorrecta");
        }
/*
        if (email.equals(usuarioEncontrado.getEmail())  & p) {
            throw new MyException("Login correcto, ingresando");
        }*/
        return usuarioEncontrado;
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

    @Transactional
    public Usuario inscripcion(Long idCurso, Long idUsuario) throws Exception {

        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        Curso curso = cursoRepository.findById(idCurso).orElse(null);

        if (usuario == null) {
            throw new Exception("El usuario no existe.");
        }
        if (curso == null) {
            throw new Exception("El curso no existe.");
        }
        if(usuario.getRol().equals(Rol.ADMIN)){
            throw new Exception("Solo los alumnos pueden inscribirse a un curso");
        }
        if (usuario.getCurso().contains(curso)) {
            throw new Exception("El usuario ya está inscripto en este curso.");
        }

        usuario.getCurso().add(curso);

        usuario= usuarioRepository.save(usuario);

        return usuario;
    }

    @Transactional
    public Usuario desinscripcion(Long idCurso, Long idUsuario) throws Exception {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        Curso curso = cursoRepository.findById(idCurso).orElse(null);

        if (usuario == null) {
            throw new Exception("El usuario no existe.");
        }

        if (curso == null) {
            throw new Exception("El curso no existe.");
        }

        if (!usuario.getCurso().contains(curso)) {
            throw new Exception("El usuario no está inscripto en este curso.");
        }
        if(usuario.getRol().equals(Rol.ADMIN)){
            throw new Exception("Solo los alumnos pueden desuscribirse a un curso");
        }

        usuario.getCurso().remove(curso);

        usuario = usuarioRepository.save(usuario);

        return usuario;
    }
}



/*
   public RespuestaUsuarioDTO login(DatosLoginUsuarioDTO datosLoginUsuarioDTO) {
        Usuario usuarioRecibido = new Usuario(datosLoginUsuarioDTO);
        Usuario usuarioEncontrado = usuarioRepository.findByEmail(usuarioRecibido.getEmail());

        if(usuarioEncontrado == null){
            throw new EntityNotFoundException("Usuario no encontrado en la base de datos");
        }

        if(!usuarioRecibido.getPassword().equals(usuarioEncontrado.getPassword())){
            throw new RuntimeException("La contraseña ingresada es incorrecta");
        }


        return new RespuestaUsuarioDTO(usuarioEncontrado.getId(), usuarioEncontrado.getNombre(), usuarioEncontrado.getApellido(), usuarioEncontrado.getEmail(), usuarioEncontrado.getAlta(), new RolDTO(usuarioEncontrado.getRol().getEstudiante(), usuarioEncontrado.getRol().getEducador(),usuarioEncontrado.getRol().getAdministrador()));
    }

 */
