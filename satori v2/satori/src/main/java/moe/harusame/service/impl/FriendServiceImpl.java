package moe.harusame.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moe.harusame.dao.FriendDao;
import moe.harusame.dao.UserDao;
import moe.harusame.dto.Result;
import moe.harusame.entity.Friend;
import moe.harusame.entity.User;
import moe.harusame.service.FriendService;

@Service
public class FriendServiceImpl implements FriendService {
	
	@Autowired
	private FriendDao friendDao;
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public Result<Integer> sendInvitation(int friendId, int userId) {
		int result = friendDao.sendInvitation(friendId, userId);
		if (result == 1) {
			return new Result<Integer>("200", "邀请发送成功", null);
		} else {
			return new Result<Integer>("400", "邀请发送失败", null);
		}
	}

	@Override
	public List<User> inviteMe(int userId) {
		List<Friend> inviteList = friendDao.inviteMe(userId);
		if (inviteList.size() > 0) {
			List<User> whoInviteMeList = new ArrayList<User>();
			for (int i = 0; i < inviteList.size(); i++) {
				Friend friend = inviteList.get(i);
				whoInviteMeList.add(userDao.getUserById(friend.getUserId())); // 得到的是对方的id
			}
			return whoInviteMeList;
		}
		return null;
	}

	@Override
	public Result<Integer> acceptInvitation(int friendId, int userId) {
		int result = friendDao.acceptInvitation(friendId, userId);
		if (result == 1) {
			return new Result<Integer>("200", "接受了邀请", null);
		} else {
			return new Result<Integer>("400", "接受邀请失败", null);
		}
	}

	@Override
	public List<User> getFriendsByUserId(int userId) {
		List<User> friendList = new ArrayList<User>();
		List<Friend> friendsIdList = friendDao.getFriendsId(userId);
		for (int i = 0; i < friendsIdList.size(); i++) {
			Friend friend = friendsIdList.get(i);
			if (userId == friend.getFriendId()) {
				friendList.add(userDao.getUserById(friend.getUserId()));
			} else {
				friendList.add(userDao.getUserById(friend.getFriendId()));
			}
		}
		return friendList;
	}
	
}
