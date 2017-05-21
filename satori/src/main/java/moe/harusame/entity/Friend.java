package moe.harusame.entity;

import java.util.Date;

public class Friend {
	private int friendId;
	private int userId;
	private int stateFriend;
	private int stateUser;
	private Date meetDate;

	public int getFriendId() {
		return friendId;
	}

	public void setFriendId(int friendId) {
		this.friendId = friendId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getStateFriend() {
		return stateFriend;
	}

	public void setStateFriend(int stateFriend) {
		this.stateFriend = stateFriend;
	}

	public int getStateUser() {
		return stateUser;
	}

	public void setStateUser(int stateUser) {
		this.stateUser = stateUser;
	}

	public Date getMeetDate() {
		return meetDate;
	}

	public void setMeetDate(Date meetDate) {
		this.meetDate = meetDate;
	}

	@Override
	public String toString() {
		return "Friend [friendId=" + friendId + ", userId=" + userId + ", stateFriend=" + stateFriend + ", stateUser="
				+ stateUser + ", meetDate=" + meetDate + "]";
	}

}
