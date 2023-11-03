package com.learning.simplified.services;

import com.learning.simplified.dto.LeccionDTO;
import com.learning.simplified.entities.Bloque;
import com.learning.simplified.entities.Leccion;
import com.learning.simplified.exceptions.BadDataEntryException;
import com.learning.simplified.repository.LeccionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeccionService {
    private LeccionRepository leccionRepository;
    @Autowired
    public LeccionService(LeccionRepository leccionRepository) {
        this.leccionRepository = leccionRepository;
    }
    @Transactional
    public Leccion createLeccion(LeccionDTO leccionDTO) {
        return leccionRepository.save(new Leccion(leccionDTO));
    }

    public void deleteLeccionById(Long id) {
        leccionRepository.deleteById(id);
    }

    @Transactional
    public void updateLesson(Leccion l, Bloque block) {
        if(l.getId()!=null){
            Leccion lesson = leccionRepository.getReferenceById(l.getId());
            if(l.getNum_leccion()!=null&&validateRepeatedLessonNumber(block, l.getNum_leccion())){
                lesson.setNum_leccion(l.getNum_leccion());
            }
            if(l.getTitulo()!=null&&validateRepeatedLessonName(block, l.getTitulo())){
                lesson.setTitulo(l.getTitulo());
            }
            if(l.getUrl_recurso()!=null&&validateRepeatedResourse(block, l.getUrl_recurso())){
                lesson.setUrl_recurso(l.getUrl_recurso());
            }
            leccionRepository.save(lesson);
        }
    }

    private boolean validateRepeatedLessonNumber(Bloque block, Integer lessonNumber) {
        for (Leccion l: block.getLecciones()) {
            if(l.getNum_leccion().equals(lessonNumber)){
                throw new BadDataEntryException("El bloque ya posee una lección con uno de los números ingresados: " + lessonNumber);
            }
        }
        return true;
    }

    private boolean validateRepeatedResourse(Bloque block, String urlRecurso) {
        for (Leccion l: block.getLecciones()) {
            if(l.getTitulo().equals(urlRecurso)){
                throw new BadDataEntryException("El curso ya posee un recurso con una de las url ingresadas: " + urlRecurso);
            }
        }
        return true;
    }

    private boolean validateRepeatedLessonName(Bloque b, String title) {
        for (Leccion l: b.getLecciones()) {
            if(l.getTitulo().equals(title)){
                throw new BadDataEntryException("El curso ya posee una lección con uno de los títulos ingresados: " + title);
            }
        }
        return true;
    }
}
