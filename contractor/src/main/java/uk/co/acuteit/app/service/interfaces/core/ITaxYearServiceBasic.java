package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import uk.co.acuteit.app.entity.tax.TaxYear;

public interface ITaxYearServiceBasic {
	
	public TaxYear save(TaxYear taxYear);
	public List<TaxYear> findAll();
	public void delete(TaxYear taxYear);
	public TaxYear findById(long id);

}
