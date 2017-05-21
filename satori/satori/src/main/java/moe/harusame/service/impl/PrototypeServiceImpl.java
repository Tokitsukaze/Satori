package moe.harusame.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moe.harusame.dao.PrototypeDao;
import moe.harusame.entity.Prototype;
import moe.harusame.service.PrototypeService;

@Service
public class PrototypeServiceImpl implements PrototypeService {

	@Autowired
	private PrototypeDao prototypeDao; 
	
	@Override
	public int insertPrototype(List<Prototype> prototypeList) {
		int result = 0;
		for (int i = 0; i < prototypeList.size(); i++) {
			Prototype prototype = prototypeList.get(i);
			result += prototypeDao.insertPrototype(prototype.getPrototypeId(), prototype.getTabId(), prototype.getTagname(), prototype.getProps(), prototype.getText(), prototype.getComment(), prototype.getUpdateDate(), prototype.getBranchId());
		}
		return result;
	}

	@Override
	public List<Prototype> getPrototype(int tabId, int branchId) {
		return prototypeDao.getPrototype(tabId, branchId);
	}

	@Override
	public int deleteBranchPrototype(int tabId, int branchId) {
		int result = prototypeDao.deleteBranchPrototype(tabId, branchId);
		return result;
	}

}
