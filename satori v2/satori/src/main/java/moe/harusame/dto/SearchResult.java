package moe.harusame.dto;

import java.util.List;

import moe.harusame.entity.Project;
import moe.harusame.entity.User;

/**
 * state 是否请求成功 info 请求成功或者失败的信息 data 请求数据
 * 
 * @author Colorful
 *
 */
public class SearchResult {
	private String state;
	private String info;
	private List<User> userList;
	private List<Project> projectList;

	public SearchResult(String state, String info, List<User> userList, List<Project> projectList) {
		super();
		this.state = state;
		this.info = info;
		this.userList = userList;
		this.projectList = projectList;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public List<User> getUserList() {
		return userList;
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	public List<Project> getProjectList() {
		return projectList;
	}

	public void setProjectList(List<Project> projectList) {
		this.projectList = projectList;
	}

	@Override
	public String toString() {
		return "SearchResult [state=" + state + ", info=" + info + ", userList=" + userList + ", projectList="
				+ projectList + "]";
	}

}
