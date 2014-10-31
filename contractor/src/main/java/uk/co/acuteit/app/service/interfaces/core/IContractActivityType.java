package uk.co.acuteit.app.service.interfaces.core;

import java.util.List;

import org.springframework.data.domain.Page;

import uk.co.acuteit.app.entity.contract.ContractEntity;
import uk.co.acuteit.app.entity.contract.ContractActivityLogTypeEntity;

public interface IContractActivityType {
	
	public ContractActivityLogTypeEntity save(ContractActivityLogTypeEntity contractStatus);
	public List<ContractActivityLogTypeEntity> findAll();
	public void delete(ContractActivityLogTypeEntity contractStatus);
	public ContractActivityLogTypeEntity findById(Long id);
	public Page<ContractActivityLogTypeEntity> getPage(int pageNumber);
	

}