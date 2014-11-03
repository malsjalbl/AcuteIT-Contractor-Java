package uk.co.acuteit.app.mileage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import uk.co.acuteit.app.mileage.entities.MileageItem;
import uk.co.acuteit.app.mileage.services.IMileageItemServiceBasic;

@Controller
@RequestMapping("/")
public class MileageItemController {

	//private static final Logger logger = LoggerFactory.getLogger(ContractController.class);
	
	@Autowired
	private IMileageItemServiceBasic mileageItemService;
	
	@RequestMapping
	(value = "/getblankitems", method = RequestMethod.GET)
	public @ResponseBody List<MileageItem> getBlankMileageItems(@RequestParam int month, @RequestParam int year) {
			
		return mileageItemService.getBlankMonthOfItems(month, year);
	 }
}


