package moe.harusame.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;

public interface FriendService {
	
	/**
	 * 发送好友邀请
	 * @param friendId
	 * @param userId
	 * @return
	 */
	Result<Integer> sendInvitation (@Param("friendId") int friendId, @Param("userId") int userId);
	
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
	Result<Integer> acceptInvitation (@Param("friendId") int friendId, @Param("userId") int userId);
	
	/**
	 * 获得一个用户的所有好友
	 * @param userId
	 * @return
	 */
	List<User> getFriendsByUserId (int userId);
}
