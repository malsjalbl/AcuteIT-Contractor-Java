package uk.co.acuteit.app.common.location;

import java.util.List;

public interface ILocationServiceBasic {
	
	public Location save(Location location);
	void delete(Location location);
	public List<Location> findAll();

}
