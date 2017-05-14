package moe.harusame.entity;

import java.util.Date;

public class Project {

	private int projectId;
	private int creator;
	private String name;
	private String info;
	private String logo;
	private Date createDate;
	private int state;

	public Project(int projectId, int creator) {
		super();
		this.projectId = projectId;
		this.creator = creator;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getCreator() {
		return creator;
	}

	public void setCreator(int creator) {
		this.creator = creator;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "Project [projectId=" + projectId + ", creator=" + creator + ", name=" + name + ", info=" + info
				+ ", logo=" + logo + ", createDate=" + createDate + ", state=" + state + "]";
	}

}
