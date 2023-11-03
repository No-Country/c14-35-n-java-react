package com.learning.simplified.services;

import com.learning.simplified.dto.BloqueDTO;
import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.LeccionDTO;
import com.learning.simplified.entities.*;
import com.learning.simplified.exceptions.BadDataEntryException;
import com.learning.simplified.repository.CategoriaRepository;
import com.learning.simplified.repository.CursoRepository;
import com.learning.simplified.repository.UsuarioRepository;
import com.learning.simplified.mappers.CursoMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CursoService {
    private CursoRepository cursoRepository;
    private UsuarioRepository usuarioRepository;
    private CategoriaRepository categoriaRepository;
    private CategoriaService categoriaService;
    private BloqueService bloqueService;
    private LeccionService leccionService;
    private CursoMapper cursoMapper;
    @Autowired
    public CursoService(CursoRepository cursoRepository, UsuarioRepository usuarioRepository, CategoriaRepository categoriaRepository, CategoriaService categoriaService, BloqueService bloqueService, LeccionService leccionService, CursoMapper cursoMapper) {
        this.cursoRepository = cursoRepository;
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
        this.categoriaService = categoriaService;
        this.bloqueService = bloqueService;
        this.leccionService = leccionService;
        this.cursoMapper = cursoMapper;
    }

    /**
     * Crea un curso y lo guarda en la base de datos. Retorna el DTO del curso creado.
     */
    @Transactional
    public CursoDTO createCurso(CursoDTO course){
        Curso courseCreated = null;
        //si valida los datos, crea el curso y lo agrega a la base de datos
        if(validateDataCreateCourse(course) && validateTeacher(course.profesor().id())){
            Usuario teacher = usuarioRepository.findUsuarioById(course.profesor().id());
            courseCreated = new Curso(course, teacher);
            courseCreated = cursoRepository.save(addCategorias(courseCreated, course.categorias()));
        }
        return cursoMapper.cursoToCursoDTO(courseCreated);
    }

    /**
     * Validaa que el usuario sea profesor
     * @param id Id del profesor
     * @return retorna true si el usuario es profesor, falso en caso contrario
     */
    private boolean validateTeacher(Long id) {
        return usuarioRepository.findUsuarioById(id).getRol().toString().equals("ADMIN");
    }

    /**
     * Recibe el curso al que agregar las categorías, y una lista de categorías. Llama a los métodos para validar 
     * todas las categorías y valida que la categoría no se encuentre en la base de datos. Si se encuentra, agrega
     * la que encontró al curso, si no, la crea y luego la agrega al curso. 
     * @param courseCreated curso al que agregar las categorías
     * @param categorias lista de categorías que se quiere agregar al curso
     * @return curso con las categorías agregadas
     */
    @Transactional
    private Curso addCategorias(Curso courseCreated, List<Categoria> categorias) {
        categorias = validateListOfCategories(categorias);
        for (Categoria cat: categorias) {
            Categoria category = categoriaRepository.findCategoriaByNombre(cat.getNombre());
            if(category == null){
                category = categoriaService.saveCategoria(new Categoria(cat.getNombre()));
            }
            courseCreated.getCategorias().add(category);
        }
        return courseCreated;
    }

    /**
     * Validación para eliminar categorías repetidas de un curso.
     * Retorna una lista con las categorías sin repetir, no nulas, no string vacíos
     *
     */
    private List<Categoria> validateListOfCategories(List<Categoria> categorias) {
        List<Categoria> aux = new ArrayList<>();
        for (Categoria cat: categorias) {
            int count = 0;
            for (Categoria c: aux) {
                if(c.getNombre().equals(cat.getNombre())){
                    count++;
                }
            }
            if (count==0 && cat.getNombre()!=null && !cat.getNombre().isEmpty()) {
                aux.add(cat);
            }
        }
        validateNumMinCategoria(aux);

        return aux;
    }
    //valida que luego de analizar cada categoría al menos quede una categoría válida, no vacía, ni nula
    private void validateNumMinCategoria(List<Categoria> aux) {
        if (aux.isEmpty()){
            throw new BadDataEntryException("Debe ingresar al menos una categoría válida");
        }
    }
    /**
     * TODO Implementar métodos para validad que los datos del curso sean válidos
     */
    public Boolean validateDataCreateCourse(CursoDTO course){

    //valida que el nombre del curso no sea nulo o esté en blanco

        if(course.nombre()==null || course.nombre().isBlank()){
            throw new BadDataEntryException("El nombre del curso no puede estar vacío");

        }
        //Valida que la descipción del curso no esté en blanco y no sea nula
        if(course.descripcion()==null || course.descripcion().isBlank()){
            throw new BadDataEntryException("La descripción del curso no puede estar vacío");
        }
        //Comprueba que el id del profesor no sea nulo
        if(course.profesor().id() == null ){
            throw new BadDataEntryException("Error con el id del profesor: No puede ser un valor vacío o nulo");
        }
        //Comprueba que el usuario que intenta crear el curso sea un usuario
        Usuario techer = usuarioRepository.findUsuarioById(course.profesor().id());
        if(!techer.getRol().toString().equals("ADMIN")){
            throw new BadDataEntryException("El usuario ingresado no es docente. " +
                    "No tiene permisos para crear cursos");
        }
        //Comprueba que exista o no un curso con el nombre que ingresa el usuario
        Curso courseFound = cursoRepository.findCursoByNombre(course.nombre());
        if(courseFound!=null){
            throw new BadDataEntryException("Ya existe un curso con el nombre: " + course.nombre());
        }
        //Comprueba que llegue la lista de categorías y que no esté vacía, que al menos llegue una
        if(course.categorias()==null|| course.categorias().isEmpty()){
            throw new BadDataEntryException("Debe ingresar al menos una categoría para el curso");
        }
        if(course.subtitle().isEmpty()||course.subtitle().isBlank()){
            throw  new BadDataEntryException("El subtitulo del curso no puede ser nulo");
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
        return cursoMapper.cursoToCursoDTO(course);
    }

    private void validateBlockDataAdd(BloqueDTO bloqueDTO) {
        if(bloqueDTO==null){
            throw new BadDataEntryException("Error en el traspaso de datos. El conjunto de datos llegó vacío");
        }
        if(bloqueDTO.id_curso()==null){
            throw new BadDataEntryException("Error en el traspaso de datos. No se reconoció el curso al que se desea agregar el Bloque");
        }
        if(bloqueDTO.nombre().isEmpty() ||bloqueDTO.nombre().isBlank()){
            throw new BadDataEntryException("Error en el traspaso de datos. No puede ingresarse un bloque sin nombre");
        }
        Curso course = cursoRepository.getCursoById(bloqueDTO.id_curso());
        if (course == null){
            throw new BadDataEntryException("No existe el curso al que desea ingresarse el bloque con el id: " + bloqueDTO.id_curso());
        }
        for (Bloque b: course.getBloques()) {
            if(b.getNombre().equals(bloqueDTO.nombre())){
                throw new BadDataEntryException("Dentro del curso, ya existe un bloque con el nombre que desea ingresar: " + bloqueDTO.nombre());
            }
        }
    }
    @Transactional
    public CursoDTO addLeccionToCurso(LeccionDTO leccionDTO) {
        validateLessonData(leccionDTO);
        Leccion lesson = leccionService.createLeccion(leccionDTO);
        Bloque block = bloqueService.addLeccion(lesson, leccionDTO.id_bloque());
        Curso course = cursoRepository.getReferenceById(leccionDTO.id_curso());
        /**
         * Función para activar automáticamente un curso al agregar la primera lección
         * El primer condicional es para evitar errores en la base de datos, los cursos que ya
         * fueron introducidos no van a tener esta función, deberán usar el endpoint para activar el curso.
         * El segundo condiciona, revisa el campo auto_activate para comprobar que al agregar la lección
         * sea verdadero. Si cuando se ingresa la primera lección, el campo continúa verdadero,
         * se activa el curso, se cambia su valor a falso por lo que no se volverá a ingresar al condicional,
         * y se actualizará ese valor en el curso.
         */
        if(course.getAuto_activate()==null){
            course.setAuto_activate(false);
            cursoRepository.save(course);
        }
        if(course.getAuto_activate()){
            course.setActivo(true);
            course.setAuto_activate(false);
            cursoRepository.save(course);
        }
        return cursoMapper.cursoToCursoDTO(course);

    }
    private void validateLessonData(LeccionDTO leccionDTO) {
        if(leccionDTO==null){
            throw new BadDataEntryException("Error de transferencia de datos. Los datos están vacíos o no se pudieron transportar");
        }
        if(leccionDTO.id_curso()==null){
            throw new BadDataEntryException("El id del curso al cual desea ingresar la lección se encuentra vacío");
        }
        if(leccionDTO.id_bloque()==null){
            throw new BadDataEntryException("El id del bloque al cual desea ingresar la lección se encuentra vacío");
        }
        if (leccionDTO.num_leccion()==null){
            throw new BadDataEntryException("El número de la lección se encuentra vacío");
        }
        if (leccionDTO.titulo()==null || leccionDTO.titulo().isBlank() || leccionDTO.titulo().isEmpty()){
            throw new BadDataEntryException("El título de la lección se encuentra vacío");
        }
        if (leccionDTO.url_recurso()==null || leccionDTO.url_recurso().isBlank() || leccionDTO.url_recurso().isEmpty()){
            throw new BadDataEntryException("Debe ingresar un recurso para la lección");
        }
        Curso course = cursoRepository.getCursoById(leccionDTO.id_curso());
        if (course==null){
            throw new BadDataEntryException("No existe en la base de datos un curso con el id ingresado: " + leccionDTO.id_curso());
        }
        Bloque block;

        block = bloqueService.getBloqueById(leccionDTO.id_bloque());

        if(block == null){
            throw new BadDataEntryException("No existe en la base de datos un bloque  con el id ingresado: " + leccionDTO.id_bloque());
        }
        for (Leccion l: block.getLecciones()) {
            if(l.getTitulo().equals(leccionDTO.titulo())){
                throw new BadDataEntryException("El bloque ya posee una lección con el título indicado: " + leccionDTO.titulo());
            }
            if(l.getNum_leccion().equals(leccionDTO.num_leccion())){
                throw new BadDataEntryException("Ya existe una lección con el número ingresado: " + leccionDTO.num_leccion());
            }
            if(l.getUrl_recurso().equals(leccionDTO.url_recurso())){
                throw new BadDataEntryException("El recurso ingresado ya se encuentra en otra lección de este bloque: " + l.getUrl_recurso());
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
        return cursoMapper.cursoToCursoDTO(course);
    }
    public List<Curso> findAllActiveCourses() {return cursoRepository.findByNameOrDescription(true);    }
    public Page<Curso> findByActivoTrue(Pageable paginacion, Long id) {
        return cursoRepository.findByNameOrDescription(paginacion, true, id);
    }
    public Page<Curso> findByTeacher(Pageable paginacion, Long id) {
        return cursoRepository.findByTeacher(paginacion, id);
    }
    public Page<Curso> findActiveCourses(Pageable paginacion) {
        return cursoRepository.findAllActiveCourses(paginacion, true);
    }
    public CursoDTO disableCourse(CursoDTO cursoDTO) {
        Curso course = cursoRepository.getReferenceById(cursoDTO.id());
        course.setActivo(false);
        cursoRepository.save(course);
        return cursoMapper.cursoToCursoDTO(course);
    }

    public CursoDTO findCourseById(Long id) {
        Curso course = cursoRepository.getReferenceById(id);
        return cursoMapper.cursoToCursoDTO(course);
    }
    //Buscador
    public Page<Curso> findByNameOrDescription(Pageable paginacion, String name, String description) {
        if(name==null||name.isEmpty()||name.isBlank()||description==null||description.isBlank()||description.isEmpty()){
            throw new BadDataEntryException("El campo de búsqueda está vacío");
        }
        return cursoRepository.findByNameOrDescription(paginacion, name, description, true);
    }
    @Transactional
    public String deleteCourseById(Long id) {
        validateLongNotNull(id);
        Curso course = cursoRepository.getReferenceById(id);
        validateCourse(course);
        //Antes de eliminar el curso es necesario sacarlo de cada usuario que esté inscripto al curso
        //Provisoriamente voy a hacer la consulta acá, cuando terminemos la hago en el usuarioService y de forma
        //más eficiente que traer todos los usuarios
        List<Usuario> users = usuarioRepository.findAll();
        for (Usuario u: users) {
            u.getCurso().remove(course);
            usuarioRepository.save(u);
       }
        for (Bloque b: course.getBloques()) {
            for (Leccion l: b.getLecciones()) {
                leccionService.deleteLeccionById(l.getId());
            }
            bloqueService.deleteBloqueById(b.getId());
        }
        cursoRepository.deleteById(id);
        return "Curso eliminado";
    }
    private void validateCourse(Curso course) {
        if (course==null){
            throw new EntityNotFoundException("No existe un curso con el id ingresado");
        }
    }
    private void validateLongNotNull(Long id) {
        if(id==null){
            throw new BadDataEntryException("No puede procesarse un id nulo");
        }
    }
    @Transactional
    public CursoDTO updateCourse(CursoDTO courseDTO) {
        //validaciones
        validateLongNotNull(courseDTO.id());
        //obtener el curso
        Curso course = cursoRepository.getCursoById(courseDTO.id());
        validateCourse(course);
        //actualizar los datos
        if(courseDTO.nombre()!=null&&validateRepeatedName(courseDTO.nombre())&&!courseDTO.nombre().isBlank()){
            course.setNombre(courseDTO.nombre());
        }
        if (courseDTO.subtitle()!=null&&!courseDTO.subtitle().isBlank()){
            course.setSubtitle(courseDTO.subtitle());
        }
        if (courseDTO.descripcion()!=null&&!courseDTO.descripcion().isBlank()){
            course.setDescripcion(courseDTO.descripcion());
        }
        if(courseDTO.url_imagen_presentacion()!=null&&!courseDTO.url_imagen_presentacion().isBlank()){
            course.setUrl_imagen_presentacion(courseDTO.url_imagen_presentacion());
        }
        if(courseDTO.url_video_presentacion()!=null&&!courseDTO.url_video_presentacion().isBlank()){
            course.setUrl_video_presentacion(courseDTO.url_video_presentacion());
        }
        if(courseDTO.activo()!=null){
            course.setActivo(courseDTO.activo());
        }
        if (courseDTO.bloques()!=null&&!courseDTO.bloques().isEmpty()){
            for (Bloque b: courseDTO.bloques()) {
                bloqueService.updateBlock(b, course);
            }
        }
        //salvar los nuevos datos
        cursoRepository.save(course);

        //retornar el curso en un dto con el mapper
        return cursoMapper.cursoToCursoDTO(course);
    }

    private boolean validateRepeatedName(String name) {
        Curso courseFound = cursoRepository.findCursoByNombre(name);
        if(courseFound!=null){
            throw new BadDataEntryException("Ya existe un curso con el siguiente nombre: " + name);
        }
        return true;
    }
}
