package uk.co.acuteit.app.contract.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.contract.entities.ContractEntity;

@Service
public class ContractServiceBasicImplementation implements IContractServiceBasic {

	private static final int PAGE_SIZE = 5;
	
	@Autowired
	private IContractRepository repository;
	
	@Override
	public void delete(ContractEntity contract) {
		repository.delete(contract);
	}

	@Override
	public ContractEntity save(ContractEntity contract) {
		return repository.save(contract);
	}

	@Override
	public ContractEntity findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<ContractEntity> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<ContractEntity> getPage(int pageNumber) {
		PageRequest pageRequest = new PageRequest(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "symbol");
	        return repository.findAll(pageRequest);
	}
}
