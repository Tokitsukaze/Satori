package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.Prototype;

public interface PrototypeDao {
	int insertPrototype (@Param("prototypeId") int prototypeId, @Param("tabId") int tabId, @Param("tagname") String tagname, @Param("props") String props, @Param("text") String text, @Param("comment") String comment, @Param("updateDate") long updateDate, @Param("branchId") int branchId);
	
	List<Prototype> getPrototype (@Param("tabId") int tabId, @Param("branchId") int branchId); 
	
	int deleteBranchPrototype (@Param("tabId") int tabId, @Param("branchId") int branchId); 
}
