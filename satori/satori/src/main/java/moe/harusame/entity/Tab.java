package moe.harusame.entity;

import java.util.Date;

public class Tab {

	private int tabId;
	private int projectId;
	private String name;
	private int state;
	private int branch;
	private Date updateDate;

	public int getTabId() {
		return tabId;
	}

	public void setTabId(int tabId) {
		this.tabId = tabId;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getBranch() {
		return branch;
	}

	public void setBranch(int branch) {
		this.branch = branch;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	@Override
	public String toString() {
		return "Tab [tabId=" + tabId + ", projectId=" + projectId + ", name=" + name + ", state=" + state + ", branch="
				+ branch + ", updateDate=" + updateDate + "]";
	}

}
