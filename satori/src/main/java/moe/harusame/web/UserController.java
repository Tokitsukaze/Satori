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
import moe.harusame.entity.User;
import moe.harusame.service.ProjectService;
import moe.harusame.service.UserService;

@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectService projectService;
	
	/**
	 * 注册
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/signup",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<User> signup(User user) {
		System.out.println("singup:" + user);
		return userService.insertUser(user.getLoginName(), user.getPassword());
	}
	
	/**
	 * 用户登录名检查
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/loginNameCheck",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<User> loginNameCheck(User user) {
		System.out.println("loginNameCheck:" + user);
		return userService.loginNameCheck(user.getLoginName());
	}
	
	/**
	 * 用户昵称检查
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/nickNameCheck",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<User> nickNameCheck(User user) {
		System.out.println("nickNameCheck:" + user);
		return userService.loginNameCheck(user.getNickName());
	}
	
	/**
	 * 用户登录
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/signin",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<User> signin(User user, HttpSession session) {
		Result<User> result = userService.login(user.getLoginName(), user.getPassword());
		User resultUser = result.getData();
		if (resultUser != null) {
			session.setAttribute("SESSION_info", resultUser.getInfo());
			session.setAttribute("SESSION_nickName", resultUser.getNickName());
			session.setAttribute("SESSION_userAvatar", resultUser.getAvatar());
			session.setAttribute("SESSION_userImpression", resultUser.getImpression());
			session.setAttribute("SESSION_userId", resultUser.getUserId());
		}
		return result;
	}
	
	/**
	 * 修改信息
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/home/{userId}/updateInfo",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> updateInfo(@PathVariable("userId") int userId, User user) {
		System.out.println("info:" + user);
		Result<Integer> result = userService.updateInfo(userId, user.getInfo());
		return result;
	}
	
	/**
	 * 修改昵称
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/home/{userId}/updateNickName",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> updateNickName(@PathVariable("userId") int userId, User user) {
		Result<Integer> result = userService.updateNickName(userId, user.getNickName());
		return result;
	}
	
	
	
	/**
	 * 根据 uid 获得一个用户
	 * @param userId
	 * @return
	 */
	@RequestMapping(
		value = "/home/{userId}/getUser",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<User> getUser(@PathVariable("userId") int userId) {
		Result<User> result = userService.getUserById(userId);
		return result;
	}
	
	@RequestMapping(
		value = "/home/{userId}/{type}",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Card>> getCardList (@PathVariable("userId") Integer userId, @PathVariable("type") String type) {
		List<Card> list = new ArrayList<Card>();
		switch (type) {
			case "trend":
				list.add(new Card("denpa", "1" ,"夕立酱", "夕立desu", "assets/images/poi.png"));
				list.add(new Card("denpa", "2", "春雨酱", "春雨desu", "assets/images/poi.png"));
				list.add(new Card("denpa", "3", "时雨酱", "时雨desu", "assets/images/poi.png"));
				break;
			
			case "project":
				List<Project> project_list = projectService.getProjectList(userId).getData();
				System.out.println("project_list:" + project_list);
				for (int i = 0; i < project_list.size(); i++) {
					Project pro = project_list.get(i);
					System.out.println("projectId" + pro.getProjectId());
					list.add(new Card("project", pro.getProjectId() + "", pro.getName(), pro.getInfo(), pro.getCreateDate()));
				}
				/*list.add(new Card("project", "大学社团管理系统", "一个简单的社团管理系统", new Date()));
				list.add(new Card("project", "夕立酱", "夕立desu", new Date()));
				list.add(new Card("project", "夕立酱", "夕立desu", new Date()));*/
				break;
			
			case "store":
				break;
			
			case "note":
				break;
		}
		
		Result<List<Card>> result = new Result<List<Card>>("200", "获取成功", list);
		return result;
	}
}
