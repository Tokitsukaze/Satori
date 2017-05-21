package moe.harusame.entity;

public class Prototype {

	private int prototypeId;
	private int tabId;
	private String tagname;
	private String props;
	private String text;
	private String comment;
	private long updateDate;
	private int branchId;

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

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

	public long getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(long updateDate) {
		this.updateDate = updateDate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public String toString() {
		return "Prototype [prototypeId=" + prototypeId + ", tabId=" + tabId + ", tagname=" + tagname + ", props="
				+ props + ", text=" + text + ", comment=" + comment + ", updateDate=" + updateDate + ", branchId="
				+ branchId + "]";
	}

}
