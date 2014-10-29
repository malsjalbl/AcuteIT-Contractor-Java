package uk.co.acuteit.app.service.implementations.mileage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.mileage.Vehicle;
import uk.co.acuteit.app.repository.mileage.IVehicleRepository;
import uk.co.acuteit.app.service.interfaces.mileage.IVehicleServiceBasic;

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

