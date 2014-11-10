package uk.co.acuteit.app.mileage;

import java.util.List;

public interface IMileageItemServiceBasic {
	
	public List<MileageItem> getBlankMonthOfItems(int mileageMonth, int mileageYear);

}
