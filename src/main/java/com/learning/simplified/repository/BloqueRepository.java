package com.learning.simplified.repository;

import com.learning.simplified.entidades.Bloque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloqueRepository extends JpaRepository<Bloque, Long> {
}
