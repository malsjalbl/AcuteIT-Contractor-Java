package uk.co.acuteit.app.mileage.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.mileage.entities.Vehicle;

@Service
public class VehicleServiceBasicImpl implements IVehicleServiceBasic {

	@Autowired
	private IVehicleRepository repository;
	
	@Override
	public void delete(Vehicle vehicle) {
		repository.delete(vehicle);
	}

	@Override
	public Vehicle save(Vehicle vehicle) {
		return repository.save(vehicle);
	}

	@Override
	public Vehicle findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<Vehicle> findAll() {
		return repository.findAll();
	}

}

