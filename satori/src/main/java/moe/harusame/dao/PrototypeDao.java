package moe.harusame.dao;

import java.util.Date;
import org.apache.ibatis.annotations.Param;

public interface PrototypeDao {
	int insertPrototype (@Param("tabId") int tabId);
	
	
}
