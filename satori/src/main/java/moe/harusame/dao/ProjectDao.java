package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.Project;

public interface ProjectDao {
	
	/**
	 * ����һ����Ŀ
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	int insertProject (@Param("creator") int creator, @Param("name") String name, @Param("info") String info);
	
	/**
	 * �ϴ�logo
	 * @param logo
	 * @return
	 */
	int updateLogo (@Param("projectId") int projectId, @Param("creator") int creator, @Param("logo") String logo);
	
	/**
	 * ������Ϣ
	 * @param projectId
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	int update (@Param("projectId") int projectId, @Param("creator") int creator, @Param("name") String name, @Param("info") String info);
	
	/**
	 * ɾ��һ����Ŀ
	 * @param projectId
	 * @param creator
	 * @return
	 */
	int remove (@Param("projectId") int projectId, @Param("creator") int creator);
	
	/**
	 * ���һ���û������� project
	 * @param creator
	 * @return
	 */
	List<Project> getProjectList (int creator);
}
