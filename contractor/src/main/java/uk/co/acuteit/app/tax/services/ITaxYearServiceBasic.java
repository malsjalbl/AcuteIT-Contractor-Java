package uk.co.acuteit.app.tax.services;

import java.util.List;

import uk.co.acuteit.app.tax.entities.TaxYear;

public interface ITaxYearServiceBasic {
	
	public TaxYear save(TaxYear taxYear);
	public List<TaxYear> findAll();
	public void delete(TaxYear taxYear);
	public TaxYear findById(long id);

}
