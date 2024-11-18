package com.example.bus.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bus.models.BusModel;
import com.example.bus.repositories.IBusRepository;

@Service
public class BusService {
    @Autowired
    IBusRepository busRepository;

    public ArrayList<BusModel> getAllBuses() {
        return (ArrayList<BusModel>) busRepository.findAll();
    }

    public Optional<BusModel> getBusById(Long id) {
        return busRepository.findById(id);
    }

    public BusModel saveBus(BusModel bus) {
        return busRepository.save(bus);
    }

    public BusModel updateById(BusModel request, Long id) {
        BusModel bus = busRepository.findById(id).get();
        bus.setNumeroBus(request.getNumeroBus());
        bus.setMarca(request.getMarca());
        bus.setCaracteristicas(request.getCaracteristicas());
        bus.setEstado(request.isEstado());
        return busRepository.save(bus);
    }

    public Boolean deleteBus(Long id) {
        try {
            busRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
