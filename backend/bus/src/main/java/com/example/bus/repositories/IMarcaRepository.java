package com.example.bus.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bus.models.MarcaModel;

@Repository
public interface IMarcaRepository extends JpaRepository<MarcaModel, Long> {

}
