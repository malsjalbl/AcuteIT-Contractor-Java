package uk.co.acuteit.app.controller.core;

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

import uk.co.acuteit.app.entity.contract.ContractEntity;
import uk.co.acuteit.app.service.interfaces.core.IContractServiceBasic;

@Controller
@RequestMapping("/contracts")
public class ContractController {
	
	private static final Logger logger = LoggerFactory.getLogger(ContractController.class);
	
	@Autowired
	private IContractServiceBasic contractService;
	
	@RequestMapping(value = "/page/{page}", method = RequestMethod.GET) 
	public @ResponseBody Page<ContractEntity> getPage(@PathVariable("page") int pageNumber) {

		return contractService.getPage(pageNumber);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST) 
	public @ResponseBody ContractEntity saveContract(@RequestBody ContractEntity contract, @PathVariable("id") Long id) {
		
		return contractService.save(contract);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET) 
	public @ResponseBody ContractEntity getContract(@PathVariable("id") Long id) {
		
		return contractService.findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE) 
	public @ResponseBody ContractEntity deleteContract(@PathVariable("id") Long id) {
		
		ContractEntity contract = contractService.findById(id);
		contractService.delete(contract);
		return contract;
	}
}
