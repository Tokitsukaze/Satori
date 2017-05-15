package moe.harusame.service;

import java.util.Date;
import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.Tab;

public interface TabService {
	Result<Integer> insertTab (int projectId, String name);
	
	Result<List<Tab>> getTabList (int projectId);
	
	Result<Tab> getTabByTabId (int tabId);
	
	Result<Integer> removeTab (int tabId);
	
	Result<Integer> updateTabName (int tabId, Date updateDate, String name);
	
	Result<Integer> updateTabDate (int tabId, Date updateDate);
}
