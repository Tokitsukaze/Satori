package moe.harusame.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.Tab;

public interface TabDao {
	
	int insertTab (@Param("projectId") int projectId, @Param("name") String name);
	
	Tab getTabByProjectIdAndName (@Param("projectId") int projectId, @Param("name") String name);
	
	List<Tab> getTabList (@Param("projectId") int projectId);
	
	Tab getTabByTabId (@Param("tabId") int tabId);
	
	int removeTab (@Param("tabId") int tabId);
	
	int updateTabName (@Param("tabId") int tabId, @Param("updateDate") Date updateDate, @Param("name") String name);
	
	int updateTabDate (@Param("tabId") int tabId, @Param("updateDate") Date updateDate);
}
