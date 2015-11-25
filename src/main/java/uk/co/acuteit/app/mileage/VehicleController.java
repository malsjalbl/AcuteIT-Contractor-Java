package uk.co.acuteit.app.mileage;

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

@Controller
@RequestMapping("/")
public class VehicleController {
	
	private static final Logger logger = LoggerFactory.getLogger(VehicleController.class);
	
	@Autowired
	private IVehicleServiceBasic vehicleService;
	
	@RequestMapping(value = "/vehicles", method = RequestMethod.GET)
	   public @ResponseBody List<Vehicle> findAll() {
			
			return vehicleService.findAll();
	  }
	
	@RequestMapping(value = "/vehicles/{id}", method = RequestMethod.POST) 
	public @ResponseBody Vehicle saveVehicle(@RequestBody Vehicle vehicle, @PathVariable("id") Long id) {
		
		return vehicleService.save(vehicle);
	}
	
	@RequestMapping(value = "/vehicles/{id}", method = RequestMethod.GET) 
	public @ResponseBody Vehicle getVehicle(@PathVariable("id") Long id) {
		
		return vehicleService.findById(id);
	}
	
	@RequestMapping(value = "/vehicles/{id}", method = RequestMethod.DELETE) 
	public @ResponseBody Vehicle deleteVehicle(@PathVariable("id") Long id) {
		
		Vehicle vehicle = vehicleService.findById(id);
		vehicleService.delete(vehicle);
		return vehicle;
	}
	
}
