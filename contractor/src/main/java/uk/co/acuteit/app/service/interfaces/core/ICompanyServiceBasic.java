package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import uk.co.acuteit.app.entity.company.Company;

public interface ICompanyServiceBasic {
	
	public Company save(Company company);
	public List<Company> findAll();
	public void delete(Company company);
	public Company findById(Long id);

}
