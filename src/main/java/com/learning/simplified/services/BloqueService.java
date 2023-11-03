package com.learning.simplified.services;

import com.learning.simplified.dto.BloqueDTO;
import com.learning.simplified.entities.Bloque;
import com.learning.simplified.entities.Curso;
import com.learning.simplified.entities.Leccion;
import com.learning.simplified.exceptions.BadDataEntryException;
import com.learning.simplified.repository.BloqueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BloqueService {

    private BloqueRepository bloqueRepository;
    private LeccionService leccionService;
    @Autowired
    public BloqueService(BloqueRepository bloqueRepository, LeccionService leccionService) {
        this.bloqueRepository = bloqueRepository;
        this.leccionService = leccionService;
    }

    public Bloque createBloque(BloqueDTO bloqueDTO) {
        return bloqueRepository.save(new Bloque(bloqueDTO));
    }

    @Transactional
    public Bloque addLeccion(Leccion lesson, Long id_bloque) {
        Bloque block = bloqueRepository.getReferenceById(id_bloque);
        block.getLecciones().add(lesson);
        return bloqueRepository.save(block);
    }

    public Bloque getBloqueById(Long id) {
        return bloqueRepository.getReferenceById(id);
    }

    public void deleteBloqueById(Long id) {
        bloqueRepository.deleteById(id);
    }

    @Transactional
    public void updateBlock(Bloque b, Curso course) {
        if(b.getId()!=null){
            Bloque block = bloqueRepository.getReferenceById(b.getId());
            if(b.getNombre()!=null&&validateRepeatedBlockName(course, b.getNombre())){
                block.setNombre(b.getNombre());
            }
            if(b.getLecciones()!=null&&!b.getLecciones().isEmpty()){
                for (Leccion l: b.getLecciones()) {
                    leccionService.updateLesson(l, b);
                }
            }
            bloqueRepository.save(block);
        }
    }

    private boolean validateRepeatedBlockName(Curso course, String name) {
        for (Bloque b : course.getBloques()) {
            if(b.getNombre().equals(name)){
                throw new BadDataEntryException("El curso ya posee un bloque con el título ingresados: " + name);
            }
        }
        return true;
    }


}
