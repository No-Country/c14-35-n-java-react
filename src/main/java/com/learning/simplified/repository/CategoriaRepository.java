package com.learning.simplified.repository;

import com.learning.simplified.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    @Query("SELECT c FROM Categoria c WHERE c.nombre=:nombre")
    Categoria findCategoriaByNombre(@Param("nombre") String nombre);

}
