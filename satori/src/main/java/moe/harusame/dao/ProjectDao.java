package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.Project;

public interface ProjectDao {
	
	/**
	 * 插入一个项目
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	int insertProject (@Param("creator") int creator, @Param("name") String name, @Param("info") String info);
	
	/**
	 * 上传logo
	 * @param logo
	 * @return
	 */
	int updateLogo (@Param("projectId") int projectId, @Param("creator") int creator, @Param("logo") String logo);
	
	/**
	 * 更新信息
	 * @param projectId
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	int update (@Param("projectId") int projectId, @Param("creator") int creator, @Param("name") String name, @Param("info") String info);
	
	/**
	 * 删除一个项目
	 * @param projectId
	 * @param creator
	 * @return
	 */
	int remove (@Param("projectId") int projectId, @Param("creator") int creator);
	
	/**
	 * 获得一个用户的所有 project
	 * @param creator
	 * @return
	 */
	List<Project> getProjectList (int creator);
}
