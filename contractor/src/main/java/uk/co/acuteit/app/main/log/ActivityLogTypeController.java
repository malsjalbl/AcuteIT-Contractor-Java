package uk.co.acuteit.app.main.log;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/contract_activity_types")
public class ActivityLogTypeController {
	
	private static final Logger logger = LoggerFactory.getLogger(ActivityLogTypeController.class);
	
	@Autowired
	private ActivityLogTypeService contractActivityTypeService;
	
	@RequestMapping(value = "/contract_activity_types", method = RequestMethod.GET)
	   public @ResponseBody List<ActivityLogType> findAll() {
			
			return contractActivityTypeService.findAll();
	  }
	
	
	@RequestMapping(value = "/page/{page}", method = RequestMethod.GET) 
	public @ResponseBody Page<ActivityLogType> getPage(@PathVariable("page") int pageNumber) {

		return contractActivityTypeService.getPage(pageNumber);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST) 
	public @ResponseBody ActivityLogType saveContractActivityType(@RequestBody ActivityLogType contractActivityType, @PathVariable("id") Long id) {
		
		return contractActivityTypeService.save(contractActivityType);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET) 
	public @ResponseBody ActivityLogType getContractActivityType(@PathVariable("id") Long id) {
		
		return contractActivityTypeService.findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE) 
	public @ResponseBody ActivityLogType deleteContractActivityType(@PathVariable("id") Long id) {
		
		ActivityLogType contractActivityType = contractActivityTypeService.findById(id);
		contractActivityTypeService.delete(contractActivityType);
		return contractActivityType;
	}
}
