package uk.co.acuteit.app.service.implementations.mileage;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import uk.co.acuteit.app.entity.mileage.MileageItem;
import uk.co.acuteit.app.service.interfaces.mileage.IMileageItemServiceBasic;

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
