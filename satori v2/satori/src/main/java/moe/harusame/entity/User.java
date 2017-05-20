package moe.harusame.entity;

import java.util.Date;

public class User {

	private int userId;
	private String loginName;
	private String password;
	private String nickName;
	private String avatar;
	private String impression;
	private String info;
	private String email;
	private Date signupDate;
	private int state;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getSignupDate() {
		return signupDate;
	}

	public void setSignupDate(Date signupDate) {
		this.signupDate = signupDate;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getImpression() {
		return impression;
	}

	public void setImpression(String impression) {
		this.impression = impression;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", loginName=" + loginName + ", password=" + password + ", nickName="
				+ nickName + ", avatar=" + avatar + ", impression=" + impression + ", info=" + info + ", email=" + email
				+ ", signupDate=" + signupDate + ", state=" + state + "]";
	}

}
