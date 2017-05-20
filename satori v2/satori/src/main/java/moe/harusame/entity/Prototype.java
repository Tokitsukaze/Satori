package moe.harusame.entity;

import java.util.Date;

public class Prototype {

	private int prototypeId;
	private int tabId;
	private String tagname;
	private String props;
	private String text;
	private Date updateDate;

	public int getPrototypeId() {
		return prototypeId;
	}

	public void setPrototypeId(int prototypeId) {
		this.prototypeId = prototypeId;
	}

	public int getTabId() {
		return tabId;
	}

	public void setTabId(int tabId) {
		this.tabId = tabId;
	}

	public String getTagname() {
		return tagname;
	}

	public void setTagname(String tagname) {
		this.tagname = tagname;
	}

	public String getProps() {
		return props;
	}

	public void setProps(String props) {
		this.props = props;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	@Override
	public String toString() {
		return "Prototype [prototypeId=" + prototypeId + ", tabId=" + tabId + ", tagname=" + tagname + ", props="
				+ props + ", text=" + text + ", updateDate=" + updateDate + "]";
	}

}
