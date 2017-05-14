package moe.harusame.entity;

import java.util.Date;

public class Card {

	private String type;
	private String title;
	private Date date;
	private String content;
	private String avatar;

	public Card(String type, String title, String content, String avatar) {
		super();
		this.type = type;
		this.title = title;
		this.content = content;
		this.avatar = avatar;
	}

	public Card(String type, String title, String content, Date date) {
		super();
		this.type = type;
		this.title = title;
		this.content = content;
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	@Override
	public String toString() {
		return "Card [type=" + type + ", title=" + title + ", date=" + date + ", content=" + content + ", avatar="
				+ avatar + "]";
	}

}
