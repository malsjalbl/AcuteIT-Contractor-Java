package uk.co.acuteit.app.common.log;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ActivityLogType implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private Long id;
	private String symbol;
	private String description;
	
	// ID - Primary Key
	// ----------------
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
	
    // Symbol (name)
    // -----------------
    @Basic
    @Column(nullable = false, unique = true)
	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	// Description
	// -----------
	@Basic
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
