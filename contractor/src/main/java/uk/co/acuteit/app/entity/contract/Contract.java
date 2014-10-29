package uk.co.acuteit.app.entity.contract;

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

@Entity
public class Contract implements Serializable {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private Long id;
	private String symbol;
	private String description;
	private Date startDate;
	private Date endDate;
	private List<ContractActivityLogItem> contractActivityLogItems;
	
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
	
    // Title of contract
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
	
	// Contract activity |Logs
	// -----------------------
	@OneToMany(cascade = CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval = true)
	@JoinTable(name = "lnk_contract_action_log")
	public List<ContractActivityLogItem> getContractActivityLogItems() {
		return this.contractActivityLogItems;
	}
	
	public void setContractActivityLogItems(List<ContractActivityLogItem> contractActivityLogItems) {
		this.contractActivityLogItems = contractActivityLogItems;
	}

	// Agreed contract start date
	// --------------------------
	@Temporal(TemporalType.DATE)
	//@Column(nullable = false)
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	// Agreed contract end date
	// ------------------------
	@Temporal(TemporalType.DATE)
	//@Column(nullable = false)
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
