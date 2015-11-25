package uk.co.acuteit.app.mileage;

import java.util.List;

public interface IVehicleServiceBasic {
	
	public Vehicle save(Vehicle vehicle);
	public List<Vehicle> findAll();
	public void delete(Vehicle company);
	public Vehicle findById(Long id);

}
