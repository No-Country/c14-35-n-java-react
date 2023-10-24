package com.learning.simplified.dto;

public record LeccionDTO(
        Long id,
        Integer num_leccion,
        String titulo,
        String url_recurso,
        Long id_curso,
        Long id_bloque

) {
}
