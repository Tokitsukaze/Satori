package moe.harusame.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.Card;
import moe.harusame.dto.Result;
import moe.harusame.entity.Project;
import moe.harusame.entity.Tab;
import moe.harusame.entity.User;
import moe.harusame.service.ProjectService;
import moe.harusame.service.TabService;

@Controller
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private TabService tabService;
	
	/**
	 * зЂВс
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/project/{userId}/insertProject",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> insertProject(@PathVariable("userId") int userId, String name, String info) {
		return projectService.insertProject(userId, name, info);
	}
	
	@RequestMapping(
		value = "/project/{userId}/getProjectList",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Project>> getProjectList(@PathVariable("userId") int userId) {
		return projectService.getProjectList(userId);
	}
	
	@RequestMapping(
		value = "/project/{projectId}/getTabList", 
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Tab>> getTabList (@PathVariable("projectId") int projectId) {
		return tabService.getTabList(projectId);
	}

	@RequestMapping(
		value = "/project/{projectId}/createTab", 
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> createTab (@PathVariable("projectId") int projectId, String name) {
		return tabService.insertTab(projectId, name);
	}
	
	@RequestMapping(
		value = "/project/{projectId}/updateTabName", 
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> updateTabName (@PathVariable("projectId") int projectId, String name, int tabId) {
		return tabService.updateTabName(tabId, name);
	}
	
	@RequestMapping(
		value = "/project/{projectId}/removeTab", 
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> removeTab (@PathVariable("projectId") int projectId, int tabId) {
		return tabService.removeTab(tabId);
	}
}
