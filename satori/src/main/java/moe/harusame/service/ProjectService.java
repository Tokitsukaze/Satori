package moe.harusame.service;

import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.Project;

public interface ProjectService {
	/**
	 * 插入一个项目
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	Result<Integer> insertProject (int creator, String name, String info);
	
	/**
	 * 上传logo
	 * @param logo
	 * @return
	 */
	Result<Integer> updateLogo (int projectId, int creator, String logo);
	
	/**
	 * 更新信息
	 * @param projectId
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	Result<Integer> update (int projectId, int creator, String name, String info);
	
	/**
	 * 删除一个项目
	 * @param projectId
	 * @param creator
	 * @return
	 */
	Result<Integer> remove (int projectId, int creator);
	
	/**
	 * 获得一个用户的所有 project
	 * @param creator
	 * @return
	 */
	Result<List<Project>> getProjectList (int creator);
}
