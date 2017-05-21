package moe.harusame.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.SearchResult;
import moe.harusame.entity.Project;
import moe.harusame.entity.User;
import moe.harusame.service.ProjectService;
import moe.harusame.service.UserService;

@Controller
public class SearchController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectService projectService;
	
	/**
	 * ×¢²á
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/search",
		method = RequestMethod.GET,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public SearchResult signup(String keyword) {
		System.out.println("keyword:" + keyword);
		List<User> userList = userService.searchUser(keyword);
		List<Project> projectList = projectService.searchProject(keyword);
		return new SearchResult("200", "ËÑË÷³É¹¦", userList, projectList);
	}
}
