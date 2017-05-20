package moe.harusame.web;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import moe.harusame.dto.Card;
import moe.harusame.dto.Result;
import moe.harusame.entity.Project;
import moe.harusame.entity.User;
import moe.harusame.service.FriendService;
import moe.harusame.service.ProjectService;
import moe.harusame.service.UserService;

@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private FriendService friendService;
	
	/**
	 * ע��
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
	 * �û���¼�����
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
	 * �û��ǳƼ��
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
	 * �û���¼
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
	 * �޸���Ϣ
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
	 * �޸��ǳ�
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
	 * ���� uid ���һ���û�
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
				list.add(new Card("project", "1" ,"����ʲô������Ŀ", "������Ŀ", new Date()));
				list.add(new Card("friend", "2", "���꽴", "����desu", "poi.png"));
				list.add(new Card("note", "1"  , "�Զ��������������", "�Զ���Ĺ�������", new Date()));
				list.add(new Card("friend", "3", "ʱ��", "ʱ��desu", "poi.png"));
				list.add(new Card("friend", "4", "Shigure", "Shgiurea", "poi.png"));
				break;
			
			case "project":
				List<Project> projectList = projectService.getProjectList(userId).getData();
				System.out.println("projectList:" + projectList);
				if (projectList == null) {
					return new Result<List<Card>>("200", "��ȡ�ɹ�������û������", null);
				}
				for (int i = 0; i < projectList.size(); i++) {
					Project pro = projectList.get(i);
					System.out.println("projectId" + pro.getProjectId());
					list.add(new Card("project", pro.getProjectId() + "", pro.getName(), pro.getInfo(), pro.getCreateDate()));
				}
				break;
			case "friends":
				List<User> friendList = friendService.getFriendsByUserId(userId);
				System.out.println("friendList:" + friendList);
				if (friendList == null) {
					return new Result<List<Card>>("200", "��ȡ�ɹ�������û������", null);
				}
				for (int i = 0; i < friendList.size(); i++) {
					User user = friendList.get(i);
					list.add(new Card("friend", user.getUserId() + "", user.getNickName(), user.getInfo(), user.getAvatar()));
				}
				break;
			
			case "store":
				break;
			
			case "note":
				break;
		}
		
		Result<List<Card>> result = new Result<List<Card>>("200", "��ȡ�ɹ�", list);
		return result;
	}
	
	@RequestMapping(
		value = "/home/{userId}/updateUserAvatar",
		method = RequestMethod.POST
	)
	@ResponseBody
	public Result<Integer> updateUserAvatar (@PathVariable("userId") int userId, @RequestParam("file") MultipartFile file) {
		Result<Integer> result;
		if (!file.isEmpty()) {
			String finalFileName;
			Date date = new Date();
			String fileName = userId + "-" + date.getTime() + "-" + "avatar" + "." + file.getContentType().split("/")[1];
			String absolutePath = "E:/Eclipse Work Space/satori/src/main/webapp/assets/images/";
			finalFileName = absolutePath + fileName;
			System.out.println("finalFileName:" + finalFileName);
			try {
				file.transferTo(new File(finalFileName)); 
				return result = userService.updateAvatar(userId, fileName);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		result = new Result<Integer>("400", "�ϴ�ͷ��ʧ��", null);
		return result;
	}
	
	@RequestMapping(
		value = "/home/{userId}/updateImpression",
		method = RequestMethod.POST
	)
	@ResponseBody
	public Result<Integer> updateImpression (@PathVariable("userId") int userId, @RequestParam("file") MultipartFile file) {
		Result<Integer> result;
		System.out.println("�ϴ�ӡ����");
		if (!file.isEmpty()) {
			String finalFileName;
			Date date = new Date();
			String fileName = userId + "-" + date.getTime() + "-" + "impression" + "." + file.getContentType().split("/")[1];
			String absolutePath = "E:/Eclipse Work Space/satori/src/main/webapp/assets/images/";
			finalFileName = absolutePath + fileName;
			try {
				file.transferTo(new File(finalFileName)); 
				result = userService.updateImpression(userId, fileName);
				System.out.println("�ϴ�ӡ����:" + result);
				return result;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		result = new Result<Integer>("400", "�ϴ�ӡ��ʧ��", null);
		return result;
	}
}
