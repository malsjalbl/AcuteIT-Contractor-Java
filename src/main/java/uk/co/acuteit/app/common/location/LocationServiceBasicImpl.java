package uk.co.acuteit.app.common.location;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceBasicImpl implements ILocationServiceBasic {

	@Autowired
	private ILocationRepository repository;
	
	@Override
	public Location save(Location location) {
		return repository.save(location);
	}

	@Override
	public void delete(Location location) {
		repository.delete(location);
	}

	@Override
	public List<Location> findAll() {
		return repository.findAll();
	}

}
