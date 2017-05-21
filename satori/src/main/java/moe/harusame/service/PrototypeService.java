package moe.harusame.service;

import java.util.List;

import moe.harusame.entity.Prototype;

public interface PrototypeService {
	int insertPrototype (List<Prototype> prototypeList);
	
	List<Prototype> getPrototype (int tabId, int branchId); 
	
	int deleteBranchPrototype (int tabId, int branchId);
}
