package moe.harusame.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;
import moe.harusame.service.UserService;

@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
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
	public Result<User> signin(User user) {
		System.out.println("signin:" + user);
		return userService.login(user.getLoginName(), user.getPassword());
	}
}
