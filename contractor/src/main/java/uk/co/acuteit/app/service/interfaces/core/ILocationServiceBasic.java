package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import uk.co.acuteit.app.entity.location.Location;

public interface ILocationServiceBasic {
	
	public Location save(Location location);
	void delete(Location location);
	public List<Location> findAll();

}
