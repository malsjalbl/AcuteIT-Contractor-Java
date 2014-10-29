package uk.co.acuteit.app.service.interfaces.mileage;

import java.util.List;

import uk.co.acuteit.app.entity.mileage.Vehicle;

public interface IVehicleServiceBasic {
	
	public Vehicle save(Vehicle vehicle);
	public List<Vehicle> findAll();
	public void delete(Vehicle company);
	public Vehicle findById(Long id);

}
