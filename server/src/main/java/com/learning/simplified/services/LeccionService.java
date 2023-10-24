package com.learning.simplified.services;

import com.learning.simplified.dto.LeccionDTO;
import com.learning.simplified.entities.Leccion;
import com.learning.simplified.repository.LeccionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeccionService {
    @Autowired
    private LeccionRepository leccionRepository;

    @Transactional
    public Leccion createLeccion(LeccionDTO leccionDTO) {
        return leccionRepository.save(new Leccion(leccionDTO));
    }
}
