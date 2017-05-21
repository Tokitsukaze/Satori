package moe.harusame.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;
import moe.harusame.entity.Whisper;
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
	
	
	/**
	 * 得到好友列表
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/friend/{userId}/friendsList",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<User>> friendsList(@PathVariable("userId") int userId) {
		List<User> friendList = friendService.getFriendsByUserId(userId);
		if (friendList.size() > 0) {
			return new Result<List<User>>("200", "获得好友列表成功", friendList);
		} else {
			return new Result<List<User>>("400", "获得好友列表成功，但是没有数据", null);
		}
	}
	
	/**
	 * 得到好友消息
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/friend/{userId}/whisperList",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Whisper>> whisperList(@PathVariable("userId") int userId) {
		List<Whisper> whisperList = friendService.getWhisperList(userId);
		if (whisperList.size() > 0) {
			return new Result<List<Whisper>>("200", "获得好友私信成功", whisperList);
		} else {
			return new Result<List<Whisper>>("400", "获得好友私信成功，但是没有数据", null);
		}
	}
	
	/**
	 * 私信给好友
	 * @param user
	 * @return
	 */
	@RequestMapping(
		value = "/friend/{userId}/sendWhisper",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<Integer> sendWhisper(@PathVariable("userId") int userId, int friendId, String messageContent) {
		return friendService.insertWhisper(userId, friendId, messageContent);
	}
	
	/**
	 * 获得与与一个好友的全部私信
	 * @param userId
	 * @param friendId
	 * @param messageContent
	 * @return
	 */
	@RequestMapping(
		value = "/friend/{userId}/getTargetFriendAllWhisper",
		method = RequestMethod.POST,
		produces = {"application/json; charset=UTF-8"}
	)
	@ResponseBody
	public Result<List<Whisper>> getTargetFriendAllWhisper(@PathVariable("userId") int userId, int friendId) {
		List<Whisper> whisperList = friendService.getAllWhisperList(userId, friendId);
		if (whisperList.size() > 0) {
			return new Result<List<Whisper>>("200", "获得与好友全部私信成功", whisperList);
		} else {
			return new Result<List<Whisper>>("400", "获得与好友全部私信成功，但是没有数据", null);
		}
	}
}
