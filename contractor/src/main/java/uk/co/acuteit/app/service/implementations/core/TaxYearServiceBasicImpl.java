package uk.co.acuteit.app.service.implementations.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.tax.TaxYear;
import uk.co.acuteit.app.repository.core.ITaxYearRepository;
import uk.co.acuteit.app.service.interfaces.core.ITaxYearServiceBasic;

@Service
public class TaxYearServiceBasicImpl implements ITaxYearServiceBasic {

	@Autowired
	private ITaxYearRepository repository;
	
	@Override
	public void delete(TaxYear taxYear) {
		repository.delete(taxYear);
	}

	@Override
	public TaxYear save(TaxYear taxYear) {
		return repository.save(taxYear);
	}

	@Override
	public TaxYear findById(long id) {
		return repository.findOne(id);
	}

	@Override
	public List<TaxYear> findAll() {
		return repository.findAll();
	}

}