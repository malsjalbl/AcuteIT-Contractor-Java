package uk.co.acuteit.app.common.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService {

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
