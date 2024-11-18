package com.example.bus.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bus.models.BusModel;
import com.example.bus.models.MarcaModel;
import com.example.bus.services.BusService;
import com.example.bus.services.MarcaService;

@RestController
@RequestMapping("/marca")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    public ArrayList<MarcaModel> getMarcas() {
        return this.marcaService.getAllMarcas();
    }

    @GetMapping(path = "/{id}")
    public Optional<MarcaModel> getById(@PathVariable("id") Long id) {
        return this.marcaService.getMarcaById(id);
    }

    @PostMapping
    public MarcaModel saveMarca(@RequestBody MarcaModel marca) {
        return this.marcaService.saveMarca(marca);
    }

    @PutMapping(path = "/{id}")
    public MarcaModel updateMarcaById(@RequestBody MarcaModel request, @PathVariable("id") Long id) {
        return this.marcaService.updateById(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        boolean ok = this.marcaService.deleteMarca(id);
        if (ok) {
            return "marca with id: " + id + "deleted";
        } else {
            return "marca with id: " + id + "not deleted";
        }
    }
}
