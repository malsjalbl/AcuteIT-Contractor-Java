package uk.co.acuteit.app.mileage;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ClaimPerRateItem {
	
	private int id;
	private int mileageItem;
	private int rate;  // In pence at present
	private int miles;
	private int totalMileageExpense;

	// ID
	// --
	public void setId(int id) {
		this.id = id;
	}
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id ;
	}

	public int getMiles() {
		return miles;
	}

	public void setMiles(int miles) {
		this.miles = miles;
	}

	public int getTotalMileageExpense() {
		return totalMileageExpense;
	}

	public void setTotalMileageExpense(int totalMileageExpense) {
		this.totalMileageExpense = totalMileageExpense;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public int getMileageItem() {
		return mileageItem;
	}

	public void setMileageItem(int mileageItem) {
		this.mileageItem = mileageItem;
	}
}
