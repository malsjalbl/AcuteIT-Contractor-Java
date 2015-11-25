package uk.co.acuteit.app.common.company;

import java.util.List;

public interface CompanyService {
	
	public Company save(Company company);
	public List<Company> findAll();
	public void delete(Company company);
	public Company findById(Long id);

}
