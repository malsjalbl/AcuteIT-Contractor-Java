package uk.co.acuteit.app.main.log;

import java.util.List;

import org.springframework.data.domain.Page;

public interface ActivityLogTypeRepository {
	
	public ActivityLogType save(ActivityLogType contractStatus);
	public List<ActivityLogType> findAll();
	public void delete(ActivityLogType contractStatus);
	public ActivityLogType findById(Long id);
	public Page<ActivityLogType> getPage(int pageNumber);
	

}