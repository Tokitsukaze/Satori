package moe.harusame.dto;

import java.util.List;

import moe.harusame.entity.User;
import moe.harusame.entity.Whisper;

public class CometResult {
	private String state;
	private String info;
	private List<User> inviteList;
	private List<Whisper> whisperList;

	public CometResult(String state, String info, List<User> inviteList, List<Whisper> whisperList) {
		super();
		this.state = state;
		this.info = info;
		this.inviteList = inviteList;
		this.whisperList = whisperList;
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

	public List<Whisper> getWhisperList() {
		return whisperList;
	}

	public void setWhisperList(List<Whisper> whisperList) {
		this.whisperList = whisperList;
	}

	@Override
	public String toString() {
		return "CometResult [state=" + state + ", info=" + info + ", inviteList=" + inviteList + ", whisperList="
				+ whisperList + "]";
	}

}
