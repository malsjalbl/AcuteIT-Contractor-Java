package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import org.springframework.data.domain.Page;

import uk.co.acuteit.app.entity.contract.Contract;
import uk.co.acuteit.app.entity.contract.ContractActivityType;

public interface IContractActivityType {
	
	public ContractActivityType save(ContractActivityType contractStatus);
	public List<ContractActivityType> findAll();
	public void delete(ContractActivityType contractStatus);
	public ContractActivityType findById(Long id);
	public Page<ContractActivityType> getPage(int pageNumber);
	

}