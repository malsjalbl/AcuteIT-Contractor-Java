package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import org.springframework.data.domain.Page;

import uk.co.acuteit.app.entity.contract.ContractEntity;

public interface IContractServiceBasic {
	
	public ContractEntity save(ContractEntity contract);
	public List<ContractEntity> findAll();
	public void delete(ContractEntity contract);
	public ContractEntity findById(Long id);
	public Page<ContractEntity> getPage(int pageNumber);
	

}
