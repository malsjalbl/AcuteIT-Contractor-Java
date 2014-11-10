package uk.co.acuteit.app.tax;

import java.util.List;

public interface ITaxYearServiceBasic {
	
	public TaxYear save(TaxYear taxYear);
	public List<TaxYear> findAll();
	public void delete(TaxYear taxYear);
	public TaxYear findById(long id);

}
