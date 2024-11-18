package com.example.bus.models;

import jakarta.persistence.*;

@Entity
@Table(name = "marca")
public class MarcaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;// ID autogenerado
    @Column(nullable = false, unique = true)
    private String nombre;

    public MarcaModel() {
    }

    // Constructor que acepta un String
    public MarcaModel(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
