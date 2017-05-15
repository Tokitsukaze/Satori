package moe.harusame.service;

import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.Project;

public interface ProjectService {
	/**
	 * ����һ����Ŀ
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	Result<Integer> insertProject (int creator, String name, String info);
	
	/**
	 * �ϴ�logo
	 * @param logo
	 * @return
	 */
	Result<Integer> updateLogo (int projectId, int creator, String logo);
	
	/**
	 * ������Ϣ
	 * @param projectId
	 * @param creator
	 * @param name
	 * @param info
	 * @return
	 */
	Result<Integer> update (int projectId, int creator, String name, String info);
	
	/**
	 * ɾ��һ����Ŀ
	 * @param projectId
	 * @param creator
	 * @return
	 */
	Result<Integer> remove (int projectId, int creator);
	
	/**
	 * ���һ���û������� project
	 * @param creator
	 * @return
	 */
	Result<List<Project>> getProjectList (int creator);
}
