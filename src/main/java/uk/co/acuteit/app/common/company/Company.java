package uk.co.acuteit.app.common.company;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Company implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private Long id;
	private String symbol;
	private String description;
	private CompanyType companyType;
	
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
	
    // Title of company
    // ----------------
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
	
	// Company Type
	// ------------
	@ManyToOne
	public CompanyType getCompanyType() {
		return this.companyType;
	}

	public void setCompanyType(CompanyType companyType) {
		this.companyType = companyType;
	}
}
