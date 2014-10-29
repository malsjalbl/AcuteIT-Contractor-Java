package uk.co.acuteit.app.controller.core;

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

import uk.co.acuteit.app.entity.company.Company;
import uk.co.acuteit.app.entity.contract.ContractActivityType;
import uk.co.acuteit.app.service.interfaces.core.IContractActivityType;

@Controller
@RequestMapping("/contract_activity_types")
public class ContractActivityTypeController {
	
	private static final Logger logger = LoggerFactory.getLogger(ContractActivityTypeController.class);
	
	@Autowired
	private IContractActivityType contractActivityTypeService;
	
	@RequestMapping(value = "/contract_activity_types", method = RequestMethod.GET)
	   public @ResponseBody List<ContractActivityType> findAll() {
			
			return contractActivityTypeService.findAll();
	  }
	
	
	@RequestMapping(value = "/page/{page}", method = RequestMethod.GET) 
	public @ResponseBody Page<ContractActivityType> getPage(@PathVariable("page") int pageNumber) {

		return contractActivityTypeService.getPage(pageNumber);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST) 
	public @ResponseBody ContractActivityType saveContractActivityType(@RequestBody ContractActivityType contractActivityType, @PathVariable("id") Long id) {
		
		return contractActivityTypeService.save(contractActivityType);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET) 
	public @ResponseBody ContractActivityType getContractActivityType(@PathVariable("id") Long id) {
		
		return contractActivityTypeService.findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE) 
	public @ResponseBody ContractActivityType deleteContractActivityType(@PathVariable("id") Long id) {
		
		ContractActivityType contractActivityType = contractActivityTypeService.findById(id);
		contractActivityTypeService.delete(contractActivityType);
		return contractActivityType;
	}
}
