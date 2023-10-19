package com.learning.simplified.services;

import com.learning.simplified.dto.BloqueDTO;
import com.learning.simplified.entities.Bloque;
import com.learning.simplified.entities.Leccion;
import com.learning.simplified.repository.BloqueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BloqueService {
    @Autowired
    private BloqueRepository bloqueRepository;

    public Bloque createBloque(BloqueDTO bloqueDTO) {
        return bloqueRepository.save(new Bloque(bloqueDTO));
    }

    @Transactional
    public Bloque addLeccion(Leccion lesson, Long id_bloque) {
        Bloque block = bloqueRepository.getReferenceById(id_bloque);
        System.out.println("Id del bloque " + block.getId());
        block.getLecciones().add(lesson);
        return bloqueRepository.save(block);
    }
}
