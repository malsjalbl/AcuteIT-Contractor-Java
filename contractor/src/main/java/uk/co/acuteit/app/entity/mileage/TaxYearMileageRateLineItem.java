package uk.co.acuteit.app.entity.mileage;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TaxYearMileageRateLineItem implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private int id;
	private int upperLimit;
	private int unitRate;  // pence initially

	// ID - Primary Key
	// ----------------
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return this.id ;
    }
	
	public void setId(int id) {
		this.id = id;
	}

	// Mileage rate limit
	// ------------------
	@Basic
	@Column(nullable = false)
	public int getUpperLimit() {
		return this.upperLimit;
	}

	public void setUpperLimit(int upperLimit) {
		this.upperLimit = upperLimit;
	}

	// Mileage rate at the limit specified
	@Basic
	@Column(nullable = false)
	public int getUnitRate() {
		return this.unitRate;
	}

	public void setUnitRate(int unitRate) {
		this.unitRate = unitRate;
	}
}
