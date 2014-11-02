package uk.co.acuteit.app.main.log;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ActivityLogTypeServiceImpl implements ActivityLogTypeService {

	private static final int PAGE_SIZE = 5;
	
	@Autowired
	private ActivityLogTypeRepository repository;
	
	@Override
	public void delete(ActivityLogType contractStatus) {
		repository.delete(contractStatus);
	}

	@Override
	public ActivityLogType save(ActivityLogType contractStatus) {
		return repository.save(contractStatus);
	}

	@Override
	public ActivityLogType findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<ActivityLogType> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<ActivityLogType> getPage(int pageNumber) {
		PageRequest pageRequest = new PageRequest(pageNumber - 1, PAGE_SIZE, Sort.Direction.DESC, "symbol");
	        return repository.findAll(pageRequest);
	}
}

