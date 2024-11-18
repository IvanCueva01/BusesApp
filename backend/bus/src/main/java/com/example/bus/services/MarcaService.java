package com.example.bus.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bus.models.BusModel;
import com.example.bus.models.MarcaModel;
import com.example.bus.repositories.IMarcaRepository;

@Service
public class MarcaService {
    @Autowired
    IMarcaRepository marcaRepository;

    public ArrayList<MarcaModel> getAllMarcas() {
        return (ArrayList<MarcaModel>) marcaRepository.findAll();
    }

    public Optional<MarcaModel> getMarcaById(Long id) {
        return marcaRepository.findById(id);
    }

    public MarcaModel saveMarca(MarcaModel marca) {
        return marcaRepository.save(marca);
    }

    public MarcaModel updateById(MarcaModel request, Long id) {
        MarcaModel marca = marcaRepository.findById(id).get();
        marca.setNombre(request.getNombre());
        return marcaRepository.save(marca);
    }

    public Boolean deleteMarca(Long id) {
        try {
            marcaRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
