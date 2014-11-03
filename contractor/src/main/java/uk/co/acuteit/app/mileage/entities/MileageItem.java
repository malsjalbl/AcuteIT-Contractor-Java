package uk.co.acuteit.app.mileage.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

@Entity
public class MileageItem implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false, unique = true)
	private Date travelDate;
	
	@OneToMany
	@JoinTable(name = "lnk_mileage_item_journey")
	private List<Journey> journeys;
	
	@OneToMany
	@JoinTable(name = "lnk_mileage_item_claim_per_band_item")
	private List<ClaimPerRateItem> claimPerRateItems;
	
	private int totalMiles;
	
	// ID - Primary Key
	// ----------------
    public int getId() {
        return id ;
    }
	
	public void setId(int id) {
		this.id = id;
	}

	// Travel Date
	// ------------
	public Date getTravelDate() {
		return travelDate;
	}

	public void setTravelDate(Date travelDate) {
		this.travelDate = travelDate;
	}

	// Journeys
	// --------
	public List<Journey> getJourneys() {
		return journeys;
	}

	public void setJourneys(List<Journey> journeys) {
		this.journeys = journeys;
	}

	public int getTotalMiles() {
		return totalMiles;
	}

	public void setTotalMiles(int totalMiles) {
		this.totalMiles = totalMiles;
	}
	
	
	public List<ClaimPerRateItem> getClaimPerRateItems() {
		return claimPerRateItems;
	}

	public void setClaimPerRateItems(List<ClaimPerRateItem> claimPerRateItems) {
		this.claimPerRateItems = claimPerRateItems;
	}


}
