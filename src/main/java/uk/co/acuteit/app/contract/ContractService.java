package uk.co.acuteit.app.contract;

import java.util.List;

import org.springframework.data.domain.Page;

public interface ContractService {
	
	public Contract save(Contract contract);
	public List<Contract> findAll();
	public void delete(Contract contract);
	public Contract findById(Long id);
	public Page<Contract> getPage(int pageNumber);
	

}
