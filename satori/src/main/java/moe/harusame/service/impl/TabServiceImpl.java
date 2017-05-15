package moe.harusame.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moe.harusame.dao.TabDao;
import moe.harusame.dto.Result;
import moe.harusame.entity.Tab;
import moe.harusame.service.TabService;

@Service
public class TabServiceImpl implements TabService {

	@Autowired
	private TabDao tabDao;

	@Override
	public Result<Integer> insertTab(int projectId, String name) {
		int result = tabDao.insertTab(projectId, name);
		if (result == 1) {
			return new Result<Integer>("200", "创建tab成功", null);
		} else {
			return new Result<Integer>("421", "创建tab失败", null);
		}
	}

	@Override
	public Result<List<Tab>> getTabList(int projectId) {
		List<Tab> list = tabDao.getTabList(projectId);
		if (list.size() > 0) {
			return new Result<List<Tab>>("200", "获取tab列表成功", list);
		} else {
			return new Result<List<Tab>>("422", "还没有tab", null);
		}
	}

	@Override
	public Result<Tab> getTabByTabId(int tabId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Integer> removeTab(int tabId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Integer> updateTabName(int tabId, Date updateDate, String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Integer> updateTabDate(int tabId, Date updateDate) {
		// TODO Auto-generated method stub
		return null;
	}

}
