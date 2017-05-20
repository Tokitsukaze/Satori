package moe.harusame.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.CometResult;
import moe.harusame.dto.Result;
import moe.harusame.entity.User;
import moe.harusame.service.FriendService;
import moe.harusame.service.ProjectService;
import moe.harusame.service.UserService;

@Controller
public class CometController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private FriendService friendService;
	
	/**
	 * 轮询
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/comet/{userId}",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public CometResult comet(@PathVariable("userId") int userId) {
		// Check Who Invite Me
		List<User> friendInviteMeList = friendService.inviteMe(userId);
		
		
		return new CometResult("200", "成功获得轮询信息", friendInviteMeList);
	}
}
