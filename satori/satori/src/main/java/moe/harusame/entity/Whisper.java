package moe.harusame.entity;

import java.util.Date;

public class Whisper {
	private int messageId;
	private int senderId;
	private int receiverId;
	private String messageContent;
	private Date sendDate;
	private int state;

	public int getMessageId() {
		return messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public int getSenderId() {
		return senderId;
	}

	public void setSenderId(int senderId) {
		this.senderId = senderId;
	}

	public int getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(int receiverId) {
		this.receiverId = receiverId;
	}

	public String getMessageContent() {
		return messageContent;
	}

	public void setMessageContent(String messageContent) {
		this.messageContent = messageContent;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "Whisper [messageId=" + messageId + ", senderId=" + senderId + ", receiverId=" + receiverId
				+ ", messageContent=" + messageContent + ", sendDate=" + sendDate + ", state=" + state + "]";
	}

}
