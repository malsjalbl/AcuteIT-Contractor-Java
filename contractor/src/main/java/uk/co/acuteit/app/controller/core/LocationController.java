package uk.co.acuteit.app.controller.core;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import uk.co.acuteit.app.entity.location.Location;
import uk.co.acuteit.app.service.interfaces.core.ILocationServiceBasic;

@Controller
@RequestMapping("/")
public class LocationController {
	
	private static final Logger logger = LoggerFactory.getLogger(LocationController.class);
	
	@Autowired
	private ILocationServiceBasic locationService;
	
	@RequestMapping(value = "/location", method = RequestMethod.GET)
	   public @ResponseBody List<Location> findAll() {
			
			return locationService.findAll();
	  }
	
	@RequestMapping(value = "/location/{id}", method = RequestMethod.POST) 
	public @ResponseBody Location saveContract(@RequestBody Location location, @PathVariable("id") long id) {
		
		logger.info(location.getSymbol() + ", " + location.getDescription() + ", " + location.getId());
		Location savedLocation = locationService.save(location);
		logger.info(savedLocation.getSymbol() + ", " + savedLocation.getDescription() + ", " + location.getId());
		return savedLocation;
	}
}