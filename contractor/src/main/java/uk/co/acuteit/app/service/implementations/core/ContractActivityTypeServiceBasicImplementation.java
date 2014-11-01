package uk.co.acuteit.app.service.implementations.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.contract.ContractActivityLogTypeEntity;
import uk.co.acuteit.app.repository.core.IContractStatusRepository;
import uk.co.acuteit.app.service.interfaces.core.IContractActivityType;

@Service
public class ContractActivityTypeServiceBasicImplementation implements IContractActivityType {

	private static final int PAGE_SIZE = 5;
	
	@Autowired
	private IContractStatusRepository repository;
	
	@Override
	public void delete(ContractActivityLogTypeEntity contractStatus) {
		repository.delete(contractStatus);
	}

	@Override
	public ContractActivityLogTypeEntity save(ContractActivityLogTypeEntity contractStatus) {
		return repository.save(contractStatus);
	}

	@Override
	public ContractActivityLogTypeEntity findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<ContractActivityLogTypeEntity> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<ContractActivityLogTypeEntity> getPage(int pageNumber) {
		PageRequest pageRequest = new PageRequest(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "symbol");
	        return repository.findAll(pageRequest);
	}
}

