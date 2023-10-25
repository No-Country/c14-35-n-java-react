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
                courseCreated.getUrl_imagen_presentacion(),
                courseCreated.getAuto_activate(),
                courseCreated.getSubtitle()
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
        if(course.subtitle().isEmpty()||course.subtitle().isBlank()){
            throw  new RuntimeException("El subtitulo del curso no puede ser nulo");
        }
        return true;
    }

    //Agrega bloques al curso
    public CursoDTO addBloqueToCurso(BloqueDTO bloqueDTO) {
        validateBlockDataAdd(bloqueDTO);
        Bloque bloque = bloqueService.createBloque(bloqueDTO);
        Curso course = cursoRepository.getReferenceById(bloqueDTO.id_curso());
        course.getBloques().add(bloque);
        course = cursoRepository.save(course);
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
                course.getUrl_imagen_presentacion(),
                course.getAuto_activate(),
                course.getSubtitle()
        );
    }

    private void validateBlockDataAdd(BloqueDTO bloqueDTO) {
        if(bloqueDTO==null){
            throw new RuntimeException("Error en el traspaso de datos. El conjunto de datos llegó vacío");
        }
        if(bloqueDTO.id_curso()==null){
            throw new RuntimeException("Error en el traspaso de datos. No se reconoció el curso al que se desea agregar el Bloque");
        }
        if(bloqueDTO.nombre().isEmpty() ||bloqueDTO.nombre()==null){
            throw new RuntimeException("Error en el traspaso de datos. No puede ingresarse un bloque sin nombre");
        }
        Curso course = cursoRepository.getCursoById(bloqueDTO.id_curso());
        if (course == null){
            throw new RuntimeException("No existe el curso al que desea ingresarse el bloque");
        }
        for (Bloque b: course.getBloques()) {
            if(b.getNombre().equals(bloqueDTO.nombre())){
                throw new RuntimeException("Dentro del curso, ya existe un bloque con el nombre que desea ingresar");
            }
        }
    }

    @Transactional
    public CursoDTO addLeccionToCurso(LeccionDTO leccionDTO) {
        validateLessonData(leccionDTO);
        Leccion lesson = leccionService.createLeccion(leccionDTO);
        Bloque block = bloqueService.addLeccion(lesson, leccionDTO.id_bloque());
        Curso course = cursoRepository.getReferenceById(leccionDTO.id_curso());
        if(course.getAuto_activate()){
            course.setActivo(true);
            course.setAuto_activate(false);
            cursoRepository.save(course);
        }
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
                course.getUrl_imagen_presentacion(),
                course.getAuto_activate(),
                course.getSubtitle()
        );

    }

    private void validateLessonData(LeccionDTO leccionDTO) {
        if(leccionDTO==null){
            throw new RuntimeException("Error de transferencia de datos. Los datos están vacíos o no se pudieron transportar");
        }
        if(leccionDTO.id_curso()==null){
            throw new RuntimeException("El id del curso al cual desea ingresar la lección se encuentra vacío");
        }
        if(leccionDTO.id_bloque()==null){
            throw new RuntimeException("El id del bloque al cual desea ingresar la lección se encuentra vacío");
        }
        if (leccionDTO.num_leccion()==null){
            throw new RuntimeException("El número de la lección se encuentra vacío");
        }
        if (leccionDTO.titulo()==null || leccionDTO.titulo().isBlank() || leccionDTO.titulo().isEmpty()){
            throw new RuntimeException("El título de la lección se encuentra vacío");
        }
        if (leccionDTO.url_recurso()==null || leccionDTO.url_recurso().isBlank() || leccionDTO.url_recurso().isEmpty()){
            throw new RuntimeException("No se ingresó un recurso para la lección");
        }
        Curso course = cursoRepository.getCursoById(leccionDTO.id_curso());
        if (course==null){
            throw new RuntimeException("No existe en la base de datos un curso con el id ingresado");
        }


        //TODO Revisar
        Bloque block;

        block = bloqueService.getBloqueById(leccionDTO.id_bloque());

        if(block == null){
            throw new RuntimeException("No existe en la base de datos un bloque  con el id ingresado");
        }
        for (Leccion l: block.getLecciones()) {
            if(l.getTitulo().equals(leccionDTO.titulo())){
                throw new RuntimeException("El bloque ya posee una lección con el título indicado");
            }
            if(l.getNum_leccion()==leccionDTO.num_leccion()){
                throw new RuntimeException("Ya existe una lección con el número ingresado");
            }
            if(l.getUrl_recurso().equals(leccionDTO.url_recurso())){
                throw new RuntimeException("El recurso ingresado ya se encuentra en otra lección de este bloque");
            }
        }
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
                course.getUrl_imagen_presentacion(),
                course.getAuto_activate(),
                course.getSubtitle()
        );

    }

    public List<Curso> findAllActiveCourses() {
        List <Curso> courses = cursoRepository.findByNameOrDescription(true);
        return courses;
    }

    public Page<Curso> findByActivoTrue(Pageable paginacion, Long id) {
        return cursoRepository.findByNameOrDescription(paginacion, true, id);
    }

    public Page<Curso> findByTeacher(Pageable paginacion, Long id) {
        return cursoRepository.findByNameOrDescription(paginacion, id);
    }

    public Page<Curso> findActiveCourses(Pageable paginacion) {
        return cursoRepository.findAllActiveCourses(paginacion, true);

    }

    public CursoDTO disableCourse(CursoDTO cursoDTO) {
        Curso course = cursoRepository.getReferenceById(cursoDTO.id());
        course.setActivo(false);
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
                course.getUrl_imagen_presentacion(),
                course.getAuto_activate(),
                course.getSubtitle()
        );
    }

    public Curso findCourseById(Long id) {
        return cursoRepository.getReferenceById(id);

    }
    //Buscador
    public Page<Curso> findByNameOrDescription(Pageable paginacion, String name, String description) {
        if(name==null||name.isEmpty()||name.isBlank()||description==null||description.isBlank()||description.isEmpty()){
            throw new RuntimeException("El campo de búsqueda está vacío");
        }
        return cursoRepository.findByNameOrDescription(paginacion, name, description);
    }
}
