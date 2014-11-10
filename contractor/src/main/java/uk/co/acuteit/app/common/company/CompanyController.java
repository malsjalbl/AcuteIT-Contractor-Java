package uk.co.acuteit.app.common.company;

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
public class CompanyController {
	
private static final Logger logger = LoggerFactory.getLogger(CompanyController.class);
	
	@Autowired
	private CompanyService companyService;
	
	@RequestMapping(value = "/company", method = RequestMethod.GET)
	   public @ResponseBody List<Company> findAll() {
			
			return companyService.findAll();
	  }
	
	@RequestMapping(value = "/company/{id}", method = RequestMethod.POST) 
	public @ResponseBody Company saveContract(@RequestBody Company company, @PathVariable("id") Long id) {
		
		logger.info(company.getSymbol() + ", " + company.getDescription() + ", " + company.getId());
		Company savedCompany = companyService.save(company);
		logger.info(savedCompany.getSymbol() + ", " + savedCompany.getDescription() + ", " + savedCompany.getId());
		return savedCompany;
	}
	
	@RequestMapping(value = "/company/{id}", method = RequestMethod.GET) 
	public @ResponseBody Company getContract(@PathVariable("id") Long id) {
		
		Company company = companyService.findById(id);
		return company;
	}
	
	@RequestMapping(value = "/company/{id}", method = RequestMethod.DELETE) 
	public @ResponseBody Company deleteCompany(@PathVariable("id") Long id) {
		
		Company company = companyService.findById(id);
		companyService.delete(company);
		return company;
	}

}
