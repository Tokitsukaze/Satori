package moe.harusame.service;

import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;
import moe.harusame.entity.Whisper;

public interface FriendService {
	
	/**
	 * 发送好友邀请
	 * @param friendId
	 * @param userId
	 * @return
	 */
	Result<Integer> sendInvitation (int friendId, int userId);
	
	/**
	 * 得到我正被哪些人邀请
	 * @param userId
	 * @return
	 */
	List<User> inviteMe (int userId);
	
	/**
	 * 通过邀请，成为好友
	 * @param friendId
	 * @param userId
	 * @return
	 */
	Result<Integer> acceptInvitation (int friendId, int userId);
	
	/**
	 * 获得一个用户的所有好友
	 * @param userId
	 * @return
	 */
	List<User> getFriendsByUserId (int userId);
	
	/**
	 * 得到一个用户的所有私信消息
	 */
	List<Whisper> getWhisperList (int userId);
	
	/**
	 * 插入一条私信
	 * @return
	 */
	Result<Integer> insertWhisper (int senderId, int receiverId, String messageContent);
	
	/**
	 * 获得所有包括我发送的 对面发送的私信
	 * @param userId
	 * @return
	 */
	List<Whisper> getAllWhisperList (int userId, int friendId);
}
