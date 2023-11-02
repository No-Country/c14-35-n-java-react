package com.learning.simplified.repository;

import com.learning.simplified.entities.Curso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    @Query("SELECT c FROM Curso c WHERE c.nombre=:nombre")
    Curso findCursoByNombre(@Param("nombre") String nombre);
    @Query("SELECT c FROM Curso c WHERE c.id=:id")
    Curso getCursoById(@Param("id") Long id);
    @Query("SELECT c FROM Curso c WHERE c.activo=:activo")
    List<Curso> findByNameOrDescription(@Param("activo") boolean b);

    @Query("SELECT c FROM Curso c WHERE c.activo=:activo AND c.profesor.id=:id")
    Page<Curso> findByNameOrDescription(Pageable paginacion, @Param("activo") boolean b, @Param("id") Long id);
    @Query("SELECT c FROM Curso c WHERE c.profesor.id=:id")
    Page<Curso> findByTeacher(Pageable paginacion, @Param("id") Long id);
    @Query("SELECT c FROM Curso c WHERE c.activo=:activo")
    Page<Curso> findAllActiveCourses(Pageable paginacion,  @Param("activo")boolean b);

    @Query("SELECT c FROM Curso c WHERE c.activo=:activo AND (c.nombre LIKE CONCAT('%',:name,'%') OR c.descripcion LIKE CONCAT('%',:description,'%'))")
    Page<Curso> findByNameOrDescription(Pageable paginacion, @Param("name") String name, @Param("description") String description,  @Param("activo") boolean b);
}
