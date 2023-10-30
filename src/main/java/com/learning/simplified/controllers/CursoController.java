package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.entities.Curso;
import com.learning.simplified.services.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    @Autowired
    private CursoService cursoService;

    /**
     * Método para crear cursos nuevos y agregarlos a la base de datos
     * @param cursoDTO Contiene los datos enviados en el body de la request
     * @param uriComponentsBuilder Crea una url para cada curso
     * @return En caso de éxito devuelve una respuesta 201, con un body que contiene la información del curso en un DTO
     */
    @PostMapping("/add")
    public ResponseEntity<CursoDTO> addCurso(@RequestBody CursoDTO cursoDTO,
                                                         UriComponentsBuilder uriComponentsBuilder){
        CursoDTO course = cursoService.createCurso(cursoDTO);
        URI url = uriComponentsBuilder.path("/curso/{id}").buildAndExpand(course.id()).toUri();
        return ResponseEntity.created(url).body(course);
    }

    /**
     * Método para pruebas. Busca todos los cursos de la base de datos
     * @return Retorna un array con todos los cursos encontrados en la base de datos.
     */
    @GetMapping("/all")
    public List<Curso> listarCursos(){
        return cursoService.findAll();
    }

    /**
     * Modifica un curso, colocando su campo "activo" en true
     * @param cursoDTO DTO que almacena el id del curso que se desea activar
     * @return Retorna un 200 Ok con la información actualizada del curso
     */

    @PutMapping("/activate")
    public ResponseEntity<CursoDTO> activateCurso(@RequestBody CursoDTO cursoDTO){
        CursoDTO course = cursoService.activateCurso(cursoDTO);
        return ResponseEntity.ok().body(course);
    }

    /**
     * Modifica un curso, colocando su campo "activo" en false
     * @param cursoDTO cursoDTO DTO que almacena el id del curso que se desea desactivar
     * @return Retorna un 200 Ok con la información actualizada del curso
     */
    @PutMapping("/disable")
    public ResponseEntity<CursoDTO> disableCourse(@RequestBody CursoDTO cursoDTO){
        CursoDTO course = cursoService.disableCourse(cursoDTO);
        return ResponseEntity.ok().body(course);
    }

    /**
     * Muestra todos los cursos activos. Devuelve una lista de cursos, no está paginado
     * @return
     */
    @GetMapping("/allActive")
    public List<Curso> showAllActiveCourse(){
        return cursoService.findAllActiveCourses();
    }

    /**
     * Método para buscar todos los cursos con el campo activo = true de la db
     * @param paginacion Interface que permite devolver los datos en forma de páginas.
     * @size es el tamaño por defecto de la página, aunque puede modificarse
     * @return Devuelve un 200 Ok, y por defecto la primera página de la búsqueda de cursos con los
     * primeros 10 resultados
     */
    @GetMapping("/allCourses")
    public ResponseEntity<Page<CursoDTO>> showActiveCourses(@PageableDefault(size = 10) Pageable paginacion) {
        return ResponseEntity.ok(cursoService.findActiveCourses(paginacion).map(CursoDTO::new));
    }
    /**
     * Metodo que retorna todos los cursos activos de un profesor por su id
     * @param paginacion Interface que permite devolver los datos en forma de páginas.
     * @param id captura el valor de la variable id
     * @return Devuelve un 200 Ok, y por defecto la primera página de la búsqueda de cursos con los
     *primeros 10 resultados
     */
    @GetMapping("/active-teacher/{id}")
    public ResponseEntity<Page<CursoDTO>> findActiveCoursesByTeacher(@PageableDefault(size = 10) Pageable paginacion, @PathVariable Long id) {
        return ResponseEntity.ok(cursoService.findByActivoTrue(paginacion, id).map(CursoDTO::new));
    }
    /**
     * Metodo que retorna todos los cursos,  activos e inactivos, de un profesor por su id
     * @param paginacion Interface que permite devolver los datos en forma de páginas.
     * @param id captura el valor de la variable id
     * @return Devuelve un 200 Ok, y por defecto la primera página de la búsqueda de cursos con los
     *      primeros 10 resultados
     */
    @GetMapping("/teacher/{id}")
    public ResponseEntity<Page<CursoDTO>> findAllCoursesByTeacher(@PageableDefault(size = 10) Pageable paginacion, @PathVariable Long id) {
        return ResponseEntity.ok(cursoService.findByTeacher(paginacion, id).map(CursoDTO::new));

    }
    /**
     * Método que busca el curso con el id ingresado y devuelve su contenido
     * @param id captura el valor de la variable id del path
     * @return si encuentra el curso, devuelve un 200 Ok, y los datos del curso
     */
    @GetMapping("/{id}")
    public ResponseEntity<CursoDTO>  findCourseById(@PathVariable Long id) {
        return ResponseEntity.ok().body(cursoService.findCourseById(id));
    }
    /**
     * Método para buscar cursos por nombre y descripción
     * @param paginacion interface para devolver el resultado páginado
     * @param name captura el valor del parametro name
     * @param description captura el valor del parámetro descripción
     * @return retorna los cursos encontrados en la base de datos en forma de paginación.
     */
    @GetMapping("/find")
    public ResponseEntity<Page<CursoDTO>>  findCourseByNameOrDescription(@PageableDefault(size = 10) Pageable paginacion, @RequestParam String name, @RequestParam String description) {
        return ResponseEntity.ok(cursoService.findByNameOrDescription(paginacion, name, description).map(CursoDTO::new));
    }

    /**
     * EN PROCESO
     * Método para borrar un curso por id
     * @param id captura el valor de la variable id del path
     * @return retorna un ok con un String/mensaje de éxito
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String>  deleteCourseById(@PathVariable Long id) {
        return ResponseEntity.ok().body(cursoService.deleteCourseById(id));

    }



}
