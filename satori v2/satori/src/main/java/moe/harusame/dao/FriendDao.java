package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.Friend;

public interface FriendDao {
	
	int sendInvitation (@Param("friendId") int friendId, @Param("userId") int userId);
	
	List<Friend> checkMyInvitation (int userId);
	
	List<Friend> inviteMe (int userId);
	
	int acceptInvitation (@Param("friendId") int friendId, @Param("userId") int userId);
	
	List<Friend> getFriendsId (int userId);
}
