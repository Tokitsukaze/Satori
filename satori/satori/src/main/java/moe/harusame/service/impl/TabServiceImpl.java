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
		int tabId = 0;
		if (result == 1) {
			tabId = tabDao.getTabByProjectIdAndName(projectId, name).getTabId();
		}
		if (tabId != 0) {
			return new Result<Integer>("200", "创建tab成功", tabId);
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
	public Tab getTabByTabId(int tabId) {
		return tabDao.getTabByTabId(tabId);
	}

	@Override
	public Result<Integer> removeTab(int tabId) {
		int result = tabDao.removeTab(tabId);
		if (result == 1) {
			return new Result<Integer>("200", "删除tab成功", null);
		} else {
			return new Result<Integer>("424", "删除tab失败", null);
		}
	}

	@Override
	public Result<Integer> updateTabName(int tabId, String name) {
		int result = tabDao.updateTabName(tabId, new Date(), name);
		if (result == 1) {
			return new Result<Integer>("200", "修改tab成功", null);
		} else {
			return new Result<Integer>("423", "修改tab失败", null);
		}
	}

	@Override
	public Result<Integer> updateTabDate(int tabId, Date updateDate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int branchAddOne(int tabId) {
		return tabDao.branchAddOne(tabId);
	}

	@Override
	public int getNewBranch(int tabId) {
		return tabDao.getNewBranch(tabId).getTabId();
	}

}
