package uk.co.acuteit.app.service.implementations.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.contract.ContractActivityType;
import uk.co.acuteit.app.repository.core.IContractStatusRepository;
import uk.co.acuteit.app.service.interfaces.core.IContractActivityType;

@Service
public class ContractActivityTypeServiceBasicImplementation implements IContractActivityType {

	private static final int PAGE_SIZE = 5;
	
	@Autowired
	private IContractStatusRepository repository;
	
	@Override
	public void delete(ContractActivityType contractStatus) {
		repository.delete(contractStatus);
	}

	@Override
	public ContractActivityType save(ContractActivityType contractStatus) {
		return repository.save(contractStatus);
	}

	@Override
	public ContractActivityType findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<ContractActivityType> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<ContractActivityType> getPage(int pageNumber) {
		PageRequest pageRequest = new PageRequest(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "symbol");
	        return repository.findAll(pageRequest);
	}
}

