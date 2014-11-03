package uk.co.acuteit.app.mileage.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import uk.co.acuteit.app.mileage.entities.MileageItem;

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
