package uk.co.acuteit.app.service.interfaces.mileage;

import java.util.List;

import uk.co.acuteit.app.entity.mileage.MileageItem;

public interface IMileageItemServiceBasic {
	
	public List<MileageItem> getBlankMonthOfItems(int mileageMonth, int mileageYear);

}
