package com.learning.simplified.repository;

import com.learning.simplified.entidades.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    @Query("SELECT c FROM Curso c WHERE c.nombre=:nombre")
    Curso findCursoByNombre(@Param("nombre") String nombre);
    @Query("SELECT c FROM Curso c WHERE c.id=:id")
    Curso getCursoById(@Param("id") Long id);
}
