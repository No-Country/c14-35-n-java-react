package com.learning.simplified.services;

import com.learning.simplified.entidades.Rol;
import com.learning.simplified.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolService {
    @Autowired
    RolRepository rolRepository;

    public Rol guardarRol(Rol rol){
        Rol rolGuardado = rolRepository.save(rol);
        return rolGuardado;
    }
}
