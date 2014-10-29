package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import org.springframework.data.domain.Page;

import uk.co.acuteit.app.entity.contract.Contract;

public interface IContractServiceBasic {
	
	public Contract save(Contract contract);
	public List<Contract> findAll();
	public void delete(Contract contract);
	public Contract findById(Long id);
	public Page<Contract> getPage(int pageNumber);
	

}
