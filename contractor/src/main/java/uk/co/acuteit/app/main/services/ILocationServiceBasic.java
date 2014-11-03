package uk.co.acuteit.app.main.services;

import java.util.List;

import uk.co.acuteit.app.main.entities.Location;

public interface ILocationServiceBasic {
	
	public Location save(Location location);
	void delete(Location location);
	public List<Location> findAll();

}
