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
@RequestMapping("/activity_log_types")
public class ActivityLogTypeController {
	
	private static final Logger logger = LoggerFactory.getLogger(ActivityLogTypeController.class);
	
	@Autowired
	private ActivityLogTypeService activityLogTypeService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	   public @ResponseBody List<ActivityLogType> findAll() {
			
			return activityLogTypeService.findAll();
	  }
	
	
	@RequestMapping(value = "/page/{page}", method = RequestMethod.GET) 
	public @ResponseBody Page<ActivityLogType> getPage(@PathVariable("page") int pageNumber) {

		return activityLogTypeService.getPage(pageNumber);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST) 
	public @ResponseBody ActivityLogType saveActivityType(@RequestBody ActivityLogType activityType, @PathVariable("id") Long id) {
		
		return activityLogTypeService.save(activityType);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET) 
	public @ResponseBody ActivityLogType getActivityType(@PathVariable("id") Long id) {
		
		return activityLogTypeService.findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE) 
	public @ResponseBody ActivityLogType deleteActivityType(@PathVariable("id") Long id) {
		
		ActivityLogType activityType = activityLogTypeService.findById(id);
		activityLogTypeService.delete(activityType);
		return activityType;
	}
}
