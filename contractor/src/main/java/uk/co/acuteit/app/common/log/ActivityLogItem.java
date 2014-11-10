package uk.co.acuteit.app.common.log;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "activity_log")
public class ActivityLogItem implements Serializable  {
	
	private static final long serialVersionUID = -8712872385957386182L;
	
	private int id;
	private Date logDate;
	private Date activityDate;
	private ActivityLogType activityType;
	private String logEntry;
	
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
	
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	public Date getLogDate() {
		return this.logDate;
	}

	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	public Date getActivityDate() {
		return this.activityDate;
	}

	public void setActivityDate(Date activityDate) {
		this.activityDate = activityDate;
	}
	
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	public ActivityLogType getActivityType() {
		return this.activityType;
	}

	public void setActivityType(ActivityLogType activityType) {
		this.activityType = activityType;
	}

	public String getLogEntry() {
		return this.logEntry;
	}

	public void setLogEntry(String logEntry) {
		this.logEntry = logEntry;
	}
}
