package uk.co.acuteit.app.mileage.services;

import java.util.List;

import uk.co.acuteit.app.main.entities.Company;

public interface ICompanyServiceBasic {
	
	public Company save(Company company);
	public List<Company> findAll();
	public void delete(Company company);
	public Company findById(Long id);

}