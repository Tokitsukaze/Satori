package moe.harusame.service;

import java.util.Date;
import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.Tab;

public interface TabService {
	Result<Integer> insertTab (int projectId, String name);
	
	Result<List<Tab>> getTabList (int projectId);
	
	Tab getTabByTabId (int tabId);
	
	Result<Integer> removeTab (int tabId);
	
	Result<Integer> updateTabName (int tabId, String name);
	
	Result<Integer> updateTabDate (int tabId, Date updateDate);
	
	int branchAddOne (int tabId);
	
	int getNewBranch (int tabId);
}
