package com.learning.simplified.repository;

import com.learning.simplified.entidades.Leccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeccionRepository extends JpaRepository<Leccion, Long> {
}
