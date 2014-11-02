package uk.co.acuteit.app.mileage.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.mileage.entities.Vehicle;

public interface IVehicleRepository extends JpaRepository<Vehicle, Long> {

}
