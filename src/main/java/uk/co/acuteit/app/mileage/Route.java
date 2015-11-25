package uk.co.acuteit.app.mileage;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import uk.co.acuteit.app.common.location.Location;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames={"location_from", "location_to", "returnroute"}))
public class Route implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private int id;
	private Location locationFrom;
	private Location locationTo;
	private boolean isReturnRoute = true;
	private int mileage = 0;
	private String comments;
	
	// ID - Primary Key
	// ----------------
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id ;
    }
	
	public void setId(int id) {
		this.id = id;
	}

	// Location From
	// -------------
	@OneToOne(optional = false)
	public Location getLocationFrom() {
		return locationFrom;
	}

	public void setLocationFrom(Location locationFrom) {
		this.locationFrom = locationFrom;
	}

	// Location To
	// -----------
	@OneToOne(optional = false)
	public Location getLocationTo() {
		return locationTo;
	}

	public void setLocationTo(Location locationTo) {
		this.locationTo = locationTo;
	}

	// Is this a return journey using the same route?
	// ----------------------------------------------
	@Column(nullable = false)
	public boolean isReturnRoute() {
		return isReturnRoute;
	}

	public void setReturnRoute(boolean isReturnRoute) {
		this.isReturnRoute = isReturnRoute;
	}

	// Mileage
	//--------
	@Column(nullable = false)
	public int getMileage() {
		return mileage;
	}

	public void setMileage(int mileage) {
		this.mileage = mileage;
	}
	
	// Comments
	// --------
	public String getcomments() {
		return comments;
	}

	public void setcomments(String comments) {
		this.comments = comments;
	}

}
