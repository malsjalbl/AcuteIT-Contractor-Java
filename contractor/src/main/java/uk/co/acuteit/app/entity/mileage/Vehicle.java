package uk.co.acuteit.app.entity.mileage;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vehicle implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private int id;
	private String registrationPlate;
	private String description;
	
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

	// Registration Plate
	// ------------------
	@Column(unique = true, nullable = false)
	public String getRegistrationPlate() {
		return registrationPlate;
	}

	public void setRegistrationPlate(String registrationPlate) {
		this.registrationPlate = registrationPlate;
	}

	// Description
	// -----------
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
