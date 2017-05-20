package moe.harusame.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.Result;
import moe.harusame.service.FriendService;

@Controller
public class FriendController {
	
	@Autowired
	private FriendService friendService;
	
	/**
	 * 发送成为好友的邀请
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/friend/{userId}/inviteFriend",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> inviteFriend(@PathVariable("userId") int userId, int friendId) {
		return friendService.sendInvitation(friendId, userId);
	}
	
	/**
	 * 接受了好友邀请
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/friend/{userId}/acceptInvite",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> acceptInvite(@PathVariable("userId") int userId, int friendId) {
		return friendService.acceptInvitation(friendId, userId);
	}
	
}
