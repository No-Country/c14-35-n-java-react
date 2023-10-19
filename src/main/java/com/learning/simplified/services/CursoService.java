package com.learning.simplified.services;

import com.learning.simplified.dto.BloqueDTO;
import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.LeccionDTO;
import com.learning.simplified.entities.*;
import com.learning.simplified.repository.CategoriaRepository;
import com.learning.simplified.repository.CursoRepository;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    private BloqueService bloqueService;

    @Autowired
    private LeccionService leccionService;


    /**
     * TODO implementar método para guardar cursp
     */
    @Transactional
    public CursoDTO createCurso(CursoDTO course){
        Curso courseCreated = null;
        //si valida los datos, crea el curso y lo agrega a la base de datos
        if(validateDataCreateCourse(course) && validateTeacher(course.id_profesor())){
            Usuario teacher = usuarioRepository.findUsuarioById(course.id_profesor());
            courseCreated = new Curso(course, teacher);
            courseCreated = cursoRepository.save(addCategorias(courseCreated, course.categorias()));
        }
        return new CursoDTO(
                courseCreated.getId(),
                courseCreated.getNombre(),
                courseCreated.getDescripcion(),
                courseCreated.getRutaAprendizaje(),
                courseCreated.getUsuario(),
                courseCreated.getProfesor().getId(),
                courseCreated.getActivo(),
                courseCreated.getCategorias(),
                courseCreated.getBloques(),
                courseCreated.getAlta(),
                courseCreated.getUrl_video_presentacion(),
                courseCreated.getUrl_imagen_presentacion()
        );
    }

    private boolean validateTeacher(Long id) {
        return usuarioRepository.findUsuarioById(id).getRol().toString().equals("ADMIN");
    }

    @Transactional
    private Curso addCategorias(Curso courseCreated, List<Categoria> categorias) {
        categorias = validateListOfCourse(categorias);
        for (Categoria cat: categorias) {
            Categoria category = categoriaRepository.findCategoriaByNombre(cat.getNombre());
            if(category == null){
                category = categoriaService.saveCategoria(new Categoria(cat.getNombre()));
            }
            courseCreated.getCategorias().add(category);
        }
        return courseCreated;
    }
    //Validación para eliminar categorías repetidas de un curso
    private List<Categoria> validateListOfCourse(List<Categoria> categorias) {
        List<Categoria> aux = new ArrayList<>();
        for (Categoria cat: categorias) {
            int count = 0;
            for (Categoria c: aux) {
                if(c.getNombre().equals(cat.getNombre())){

                    count++;
                }
            }
            //validación para nombre de categoría nulo o una cadena vacía
            if (count==0 && cat.getNombre()!=null && !cat.getNombre().equals("")) {
                aux.add(cat);
            }
        }
        validateNumMinCategoria(aux);

        return aux;
    }
    //valida que luego de analizar cada categoría al menos quede una categoría válida, no vacía, ni nula
    private void validateNumMinCategoria(List<Categoria> aux) {
        if (aux.isEmpty()){
            throw new RuntimeException("Debe ingresar al menos una categoría válida");
        }
    }
    /**
     * TODO Implementar métodos para validad que los datos del curso sean válidos
     */
    public Boolean validateDataCreateCourse(CursoDTO course){
        //valida que el nombre del curso no sea nulo o esté en blanco
        if(course.nombre()==null || course.nombre().isBlank()){
            throw new RuntimeException("El nombre del curso no puede estar vacío");
        }
        //Valida que la descipción del curso no esté en blanco y no sea nula
        if(course.descripcion()==null || course.descripcion().isBlank()){
            throw new RuntimeException("La descripción del curso no puede estar vacío");
        }
        //Comprueba que el id del profesor no sea nulo
        if(course.id_profesor() == null ){
            throw new RuntimeException("Error con el id del profesor");
        }
        //Comprueba que el usuario que intenta crear el curso sea un usuario
        Usuario techer = usuarioRepository.findUsuarioById(course.id_profesor());
        if(!techer.getRol().toString().equals("ADMIN")){
            throw new RuntimeException("El usuario ingresado no es docente. " +
                    "No tiene permisos para crear cursos");
        }
        //Comprueba que exista o no un curso con el nombre que ingresa el usuario
        Curso courseFound = cursoRepository.findCursoByNombre(course.nombre());
        if(courseFound!=null){
            throw new RuntimeException("Ya existe un curso con ese nombre");
        }
        //Comprueba que llegue la lista de categorías y que no esté vacía, que al menos llegue una
        if(course.categorias()==null|| course.categorias().isEmpty()){
            throw new RuntimeException("Debe ingresar al menos una categoría para el curso");
        }
        return true;
    }

    //Agrega bloques al curso
    public CursoDTO addBloqueToCurso(BloqueDTO bloqueDTO) {
        //validar los datos ingresados

        //validar el curso

        //validar el rol del usuario, que sea docente y sea el docente a cargo de este curso

        //creo el bloque
        //agrego el bloque a la base de datos
        // devuelvo el bloque
        Bloque bloque = bloqueService.createBloque(bloqueDTO);

        
        //traigo el curso y le agrego el bloque
        Curso course = cursoRepository.getReferenceById(bloqueDTO.id_curso());
        course.getBloques().add(bloque);

        //actializo el curso en la base de datos
        course = cursoRepository.save(course);


        //creo el dto del curso y lo devuelvo



        return new CursoDTO(
                course.getId(),
                course.getNombre(),
                course.getDescripcion(),
                course.getRutaAprendizaje(),
                course.getUsuario(),
                course.getProfesor().getId(),
                course.getActivo(),
                course.getCategorias(),
                course.getBloques(),
                course.getAlta(),
                course.getUrl_video_presentacion(),
                course.getUrl_imagen_presentacion()
        );

    }
@Transactional
    public CursoDTO addLeccionToCurso(LeccionDTO leccionDTO) {
        //validar los datos ingresados

        //validar el curso

        //validar el bloque

        //validar el rol del usuario, que sea docente y sea el docente a cargo de este curso

        //creo la leccion
        //agrego la leccion a la base de datos
        //devuelvo la leccion

        Leccion lesson = leccionService.createLeccion(leccionDTO);

        //agrego la leccion al bloque y actualizo en servicios
        //devuelvo el bloque

        Bloque block = bloqueService.addLeccion(lesson, leccionDTO.id_bloque());

        //devuelvo el curso con el bloque

        //TODO probar si sin actualizar el curso se actualiza al agregar la lección
    //Curso course = cursoRepository.getCursoById(leccionDTO.id_curso());
    Curso course = cursoRepository.getReferenceById(leccionDTO.id_curso());
        /*for (Bloque b : course.getBloques()) {
            if(b.getId()==block.getId()){
                course.getBloques().remove(b);
                course.getBloques().add(block);

            }
        }*/


    //TODO REVISAR POR QUË NO MUESTRA LOS CAMBIOS HASTA AGREGAR EL GET NOMBRE . TRANSACTIONAL?
    //System.out.println("ID CURSO: " + leccionDTO.id_curso());
    //System.out.println("CURSO" + course.getNombre());
        //course = cursoRepository.save(course);


        //actializo el curso en la base de datos
        //course = cursoRepository.save(course);

        return new CursoDTO(
                course.getId(),
                course.getNombre(),
                course.getDescripcion(),
                course.getRutaAprendizaje(),
                course.getUsuario(),
                course.getProfesor().getId(),
                course.getActivo(),
                course.getCategorias(),
                course.getBloques(),
                course.getAlta(),
                course.getUrl_video_presentacion(),
                course.getUrl_imagen_presentacion()
        );

    }
//Lista todos los cursos creados
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    public CursoDTO activateCurso(CursoDTO cursoDTO) {
        Curso course = cursoRepository.getReferenceById(cursoDTO.id());
        course.setActivo(true);
        cursoRepository.save(course);
        return new CursoDTO(
                course.getId(),
                course.getNombre(),
                course.getDescripcion(),
                course.getRutaAprendizaje(),
                course.getUsuario(),
                course.getProfesor().getId(),
                course.getActivo(),
                course.getCategorias(),
                course.getBloques(),
                course.getAlta(),
                course.getUrl_video_presentacion(),
                course.getUrl_imagen_presentacion()
        );

    }

    public List<Curso> findAllActiveCourses() {
        List <Curso> courses = cursoRepository.findByProfesorandActivoTrue(true);
        return courses;
    }

    public Page<Curso> findByActivoTrue(Pageable paginacion, Long id) {
        return cursoRepository.findByProfesorandActivoTrue(paginacion, true, id);
    }

    public Page<Curso> findByTeacher(Pageable paginacion, Long id) {
        return cursoRepository.findByProfesorandActivoTrue(paginacion, id);
    }

    public Page<Curso> findActiveCourses(Pageable paginacion) {
        return cursoRepository.findAllActiveCourses(paginacion, true);

    }
}
