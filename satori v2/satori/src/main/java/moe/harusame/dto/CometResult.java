package moe.harusame.dto;

import java.util.List;

import moe.harusame.entity.User;

public class CometResult {
	private String state;
	private String info;
	private List<User> inviteList;

	public CometResult(String state, String info, List<User> inviteList) {
		super();
		this.state = state;
		this.info = info;
		this.inviteList = inviteList;
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

	public List<User> getInviteList() {
		return inviteList;
	}

	public void setInviteList(List<User> inviteList) {
		this.inviteList = inviteList;
	}

	@Override
	public String toString() {
		return "CometResult [state=" + state + ", info=" + info + ", inviteList=" + inviteList + "]";
	}

}
