package uk.co.acuteit.app.entity.tax;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import uk.co.acuteit.app.entity.mileage.TaxYearMileageRateLineItem;

@Entity
public class TaxYear implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private int id;
	private String symbol;
	private String description;
	private Date yearStartDate;
	private Date yearEndDate;
	private List<TaxYearMileageRateLineItem> mileageRateLineItems;
	
	private int lastSubmittedYearlyMileageTotal;

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

	// Tax year start date
	// -------------------
	@Temporal(TemporalType.DATE)
	@Column(nullable = false, unique = true)
	public Date getYearStartDate() {
		return this.yearStartDate;
	}

	public void setYearStartDate(Date yearStartDate) {
		this.yearStartDate = yearStartDate;
	}

	// Tax year end date
	// -----------------
	@Temporal(TemporalType.DATE)
	@Column(nullable = false, unique = true)
	public Date getYearEndDate() {
		return this.yearEndDate;
	}

	public void setYearEndDate(Date yearEndDate) {
		this.yearEndDate = yearEndDate;
	}
	
	// Tax year mileage rates
	// ----------------------
	@OneToMany(cascade = CascadeType.ALL, fetch=FetchType.EAGER)
	@JoinTable(name = "lnk_tax_year_mileage_rate_items")
	public List<TaxYearMileageRateLineItem> getMileageRateLineItems() {
		return this.mileageRateLineItems;
	}

	public void setMileageRateLineItems(List<TaxYearMileageRateLineItem> mileageRateLineItems) {
		this.mileageRateLineItems = mileageRateLineItems;
	}

	// Last submitted yearly mileage total
	// -----------------------------------
	@Basic
	public int getLastSubmittedYearlyMileageTotal() {
		return this.lastSubmittedYearlyMileageTotal;
	}

	public void setLastSubmittedYearlyMileageTotal(int lastSubmittedYearlyMileageTotal) {
		this.lastSubmittedYearlyMileageTotal = lastSubmittedYearlyMileageTotal;
	}

	// Symbol
	// ------
	@Basic
	@Column(nullable = false, unique = true)
	public String getSymbol() {
		return this.symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	
	// Description
	// -----------
	@Basic
	@Column(length = 255)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
