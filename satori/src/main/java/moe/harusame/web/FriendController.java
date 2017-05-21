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
	 * ���ͳ�Ϊ���ѵ�����
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
	 * �����˺�������
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
	 * �õ������б�
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
			return new Result<List<User>>("200", "��ú����б�ɹ�", friendList);
		} else {
			return new Result<List<User>>("400", "��ú����б�ɹ�������û������", null);
		}
	}
	
	/**
	 * �õ�������Ϣ
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
			return new Result<List<Whisper>>("200", "��ú���˽�ųɹ�", whisperList);
		} else {
			return new Result<List<Whisper>>("400", "��ú���˽�ųɹ�������û������", null);
		}
	}
	
	/**
	 * ˽�Ÿ�����
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
	 * �������һ�����ѵ�ȫ��˽��
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
			return new Result<List<Whisper>>("200", "��������ȫ��˽�ųɹ�", whisperList);
		} else {
			return new Result<List<Whisper>>("400", "��������ȫ��˽�ųɹ�������û������", null);
		}
	}
}
