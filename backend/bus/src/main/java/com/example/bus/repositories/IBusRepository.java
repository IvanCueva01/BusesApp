package com.example.bus.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bus.models.BusModel;

@Repository
public interface IBusRepository extends JpaRepository<BusModel, Long> {
    Page<BusModel> findAll(Pageable pageable);
}
