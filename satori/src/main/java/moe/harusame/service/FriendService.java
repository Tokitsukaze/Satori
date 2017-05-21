package moe.harusame.service;

import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;
import moe.harusame.entity.Whisper;

public interface FriendService {
	
	/**
	 * ���ͺ�������
	 * @param friendId
	 * @param userId
	 * @return
	 */
	Result<Integer> sendInvitation (int friendId, int userId);
	
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
	Result<Integer> acceptInvitation (int friendId, int userId);
	
	/**
	 * ���һ���û������к���
	 * @param userId
	 * @return
	 */
	List<User> getFriendsByUserId (int userId);
	
	/**
	 * �õ�һ���û�������˽����Ϣ
	 */
	List<Whisper> getWhisperList (int userId);
	
	/**
	 * ����һ��˽��
	 * @return
	 */
	Result<Integer> insertWhisper (int senderId, int receiverId, String messageContent);
	
	/**
	 * ������а����ҷ��͵� ���淢�͵�˽��
	 * @param userId
	 * @return
	 */
	List<Whisper> getAllWhisperList (int userId, int friendId);
}
