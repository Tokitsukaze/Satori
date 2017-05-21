package moe.harusame.dto;

import java.io.Serializable;
import java.util.List;

import moe.harusame.entity.Prototype;

public class PrototypeModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	List<Prototype> prototypeList;
 
	public List<Prototype> getPrototypeList() {
		return prototypeList;
	}

	public void setPrototypeList(List<Prototype> prototypeList) {
		this.prototypeList = prototypeList;
	}

	@Override
	public String toString() {
		return "PrototypeModel [prototypeList=" + prototypeList + "]";
	}

}
