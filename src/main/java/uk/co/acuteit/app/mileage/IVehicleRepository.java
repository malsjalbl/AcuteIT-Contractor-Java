package uk.co.acuteit.app.mileage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IVehicleRepository extends JpaRepository<Vehicle, Long> {

}
