package moe.harusame.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;

public interface FriendService {
	
	/**
	 * ���ͺ�������
	 * @param friendId
	 * @param userId
	 * @return
	 */
	Result<Integer> sendInvitation (@Param("friendId") int friendId, @Param("userId") int userId);
	
	/**
	 * �õ���������Щ������
	 * @param userId
	 * @return
	 */
	List<User> inviteMe (int userId);
	
	/**
	 * ͨ�����룬��Ϊ����
	 * @param friendId
	 * @param userId
	 * @return
	 */
	Result<Integer> acceptInvitation (@Param("friendId") int friendId, @Param("userId") int userId);
	
	/**
	 * ���һ���û������к���
	 * @param userId
	 * @return
	 */
	List<User> getFriendsByUserId (int userId);
}
