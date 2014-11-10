package uk.co.acuteit.app.mileage;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MileageItemServiceBasicImpl implements IMileageItemServiceBasic{

	@Override
	public List<MileageItem> getBlankMonthOfItems(int mileageMonth,	int mileageYear) {

		List<MileageItem> blankMonthOfItems = new ArrayList<MileageItem>();
		
		blankMonthOfItems.add(new MileageItem());
		blankMonthOfItems.get(0).setTravelDate(new Date());
		return blankMonthOfItems;
	}

	

}
