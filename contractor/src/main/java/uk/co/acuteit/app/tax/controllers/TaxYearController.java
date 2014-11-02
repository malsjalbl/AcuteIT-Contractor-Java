package uk.co.acuteit.app.tax.controllers;

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

import uk.co.acuteit.app.tax.entities.TaxYear;
import uk.co.acuteit.app.tax.services.ITaxYearServiceBasic;

@Controller
@RequestMapping("/")
public class TaxYearController {

	private static final Logger logger = LoggerFactory.getLogger(TaxYearController.class);
	
	@Autowired
	private ITaxYearServiceBasic taxYearService;
	
	@RequestMapping(value = "/taxyear", method = RequestMethod.GET)
	   public @ResponseBody List<TaxYear> findAll() {
			
			List<TaxYear> taxYears = taxYearService.findAll();
			//logger.info("Unit Rate: " + Integer.toString(taxYears.get(0).getMileageRateLineItems().get(0).getUnitRate()));
			return taxYears;
			//return taxYearService.findAll();
			//return null;
	  }
	
	@RequestMapping(value = "/taxyear/{id}", method = RequestMethod.POST) 
	public @ResponseBody TaxYear saveTaxYear(@RequestBody TaxYear taxYear, @PathVariable("id") long id) {
		
		logger.info(taxYear.getSymbol() + ", " + taxYear.getDescription() + ", " + taxYear.getId());
		TaxYear savedTaxYear = taxYearService.save(taxYear);
		logger.info(savedTaxYear.getSymbol() + ", " + savedTaxYear.getDescription() + ", " + savedTaxYear.getId());
		return savedTaxYear;
	}

}
