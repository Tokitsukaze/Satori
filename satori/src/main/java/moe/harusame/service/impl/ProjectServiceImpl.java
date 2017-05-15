package moe.harusame.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moe.harusame.dao.ProjectDao;
import moe.harusame.dto.Result;
import moe.harusame.entity.Project;
import moe.harusame.service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectDao projectDao;

	@Override
	public Result<Integer> insertProject(int creator, String name, String info) {
		int result = projectDao.insertProject(creator, name, info);
		if (result == 1) {
			return new Result<Integer>("200", "创建成功", null);
		} else {
			return new Result<Integer>("410", "项目创建失败", null);
		}
	}

	@Override
	public Result<Integer> updateLogo(int projectId, int creator, String logo) {
		int result = projectDao.updateLogo(projectId, creator, logo);
		if (result == 1) {
			return new Result<Integer>("200", "修改成功", null);
		} else {
			return new Result<Integer>("411", "logo更新失败", null);
		}
	}

	@Override
	public Result<Integer> update(int projectId, int creator, String name, String info) {
		int result = projectDao.update(projectId, creator, name, info);
		if (result == 1) {
			return new Result<Integer>("200", "修改成功", null);
		} else {
			return new Result<Integer>("412", "信息修改失败", null);
		}
	}

	@Override
	public Result<Integer> remove(int projectId, int creator) {
		int result = projectDao.remove(projectId, creator);
		if (result == 1) {
			return new Result<Integer>("200", "删除成功", null);
		} else {
			return new Result<Integer>("413", "删除失败", null);
		}
	}

	@Override
	public Result<List<Project>> getProjectList(int creator) {
		List<Project> list = projectDao.getProjectList(creator);
		if (list.size() > 0) {
			return new Result<List<Project>>("200", "查询成功", list);
		} else {
			return new Result<List<Project>>("414", "查询失败", null);
		}
	}
	
	
}
