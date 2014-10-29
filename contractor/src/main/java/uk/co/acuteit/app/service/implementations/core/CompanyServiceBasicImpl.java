package uk.co.acuteit.app.service.implementations.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.company.Company;
import uk.co.acuteit.app.repository.core.ICompanyRepository;
import uk.co.acuteit.app.service.interfaces.core.ICompanyServiceBasic;

@Service
public class CompanyServiceBasicImpl implements ICompanyServiceBasic {

	@Autowired
	private ICompanyRepository repository;
	
	@Override
	public void delete(Company company) {
		repository.delete(company);
	}

	@Override
	public Company save(Company company) {
		return repository.save(company);
	}

	@Override
	public Company findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<Company> findAll() {
		return repository.findAll();
	}

}
