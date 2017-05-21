package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.User;

public interface UserDao {
	
	/**
	 * 根据 userId 获得 user
	 * @param userId
	 * @return
	 */
	User getUserById (int userId);
	
	/**
	 * 用户登录验证
	 * @param loginName
	 * @param password
	 * @return 如果User不为空，那么登陆成功
	 */
	User login (@Param("loginName") String loginName, @Param("password") String password);
	
	/**
	 * 检查登录名是否存在
	 * @param loginName
	 * @return
	 */
	User loginNameCheck (String loginName);
	
	/**
	 * 检查昵称是否存在
	 * @param nickName
	 * @return
	 */
	User nickNameCheck (String nickName);
	
	/**
	 * 更新简介
	 * @param userId
	 * @param info
	 * @return
	 */
	int updateInfo (@Param("userId") int userId, @Param("info") String info);
	
	/**
	 * 更新昵称
	 * @param userId
	 * @param nickName
	 * @return
	 */
	int updateNickName (@Param("userId") int userId, @Param("nickName") String nickName);
	
	/**
	 * 更新头像
	 * @param userId
	 * @param avatar
	 * @return
	 */
	int updateAvatar (@Param("userId") int userId, @Param("avatar") String avatar);
	
	/**
	 * 跟新映像图
	 * @param userId
	 * @param impression
	 * @return
	 */
	int updateImpression (@Param("userId") int userId, @Param("impression") String impression);
	
	/**
	 * 插入一个用户
	 * @param loginName
	 * @param password
	 * @return
	 */
	int insertUser (@Param("loginName") String loginName, @Param("password") String password, @Param("nickName") String nickName);
	
	/**
	 * 根据用户的昵称关键字查询用户
	 * @param nickName
	 * @return
	 */
	List<User> searchUser (String nickName);
}
