package uk.co.acuteit.app.mileage.services;

import java.util.List;

import uk.co.acuteit.app.mileage.entities.MileageItem;

public interface IMileageItemServiceBasic {
	
	public List<MileageItem> getBlankMonthOfItems(int mileageMonth, int mileageYear);

}
