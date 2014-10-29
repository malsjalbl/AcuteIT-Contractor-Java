package uk.co.acuteit.app.service.implementations.core;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.contract.Contract;
import uk.co.acuteit.app.repository.core.IContractRepository;
import uk.co.acuteit.app.service.interfaces.core.IContractServiceBasic;

@Service
public class ContractServiceBasicImplementation implements IContractServiceBasic {

	private static final int PAGE_SIZE = 5;
	
	@Autowired
	private IContractRepository repository;
	
	@Override
	public void delete(Contract contract) {
		repository.delete(contract);
	}

	@Override
	public Contract save(Contract contract) {
		return repository.save(contract);
	}

	@Override
	public Contract findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<Contract> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<Contract> getPage(int pageNumber) {
		PageRequest pageRequest = new PageRequest(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "symbol");
	        return repository.findAll(pageRequest);
	}
}
