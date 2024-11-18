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
import com.example.bus.services.BusService;

@RestController
@RequestMapping("/bus")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping
    public ArrayList<BusModel> getBuses() {
        return this.busService.getAllBuses();
    }

    @GetMapping(path = "/{id}")
    public Optional<BusModel> getById(@PathVariable("id") Long id) {
        return this.busService.getBusById(id);
    }

    @PostMapping
    public BusModel saveBus(@RequestBody BusModel bus) {
        return this.busService.saveBus(bus);
    }

    @PutMapping(path = "/{id}")
    public BusModel updateBusById(@RequestBody BusModel request, @PathVariable("id") Long id) {
        return this.busService.updateById(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        boolean ok = this.busService.deleteBus(id);
        if (ok) {
            return "user with id: " + id + "deleted";
        } else {
            return "user with id: " + id + "not deleted";
        }
    }

}
