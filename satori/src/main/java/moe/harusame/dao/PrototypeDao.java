package moe.harusame.dao;

import org.apache.ibatis.annotations.Param;

public interface PrototypeDao {
	int insertPrototype (@Param("tabId") int tabId);
	
	
}
