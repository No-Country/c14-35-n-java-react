package com.learning.simplified.repository;

import com.learning.simplified.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT u FROM Usuario u WHERE u.email=:email")
    Usuario findByEmail(@Param("email") String email);

    @Query("SELECT u FROM Usuario u WHERE u.id=:id")
    Usuario findUsuarioById(@Param("id") Long id);


}
