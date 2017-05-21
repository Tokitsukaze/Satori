package moe.harusame.service;

import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;

public interface UserService {
	
	/**
	 * 用户登录验证
	 * @param loginName
	 * @param password
	 * @return 如果User不为空，那么登陆成功
	 */
	Result<User> login (String loginName, String password);
	
	/**
	 * 检查登录名是否存在
	 * @param loginName
	 * @return
	 */
	Result<User> loginNameCheck (String loginName);
	
	/**
	 * 检查昵称是否存在
	 * @param nickName
	 * @return
	 */
	Result<User> nickNameCheck (String nickName);
	
	/**
	 * 更新简介
	 * @param userId
	 * @param info
	 * @return
	 */
	Result<Integer> updateInfo (int userId, String info);
	
	/**
	 * 更新头像
	 * @param userId
	 * @param avatar
	 * @return
	 */
	Result<Integer> updateAvatar (int userId, String avatar);
	
	/**
	 * 跟新映像图
	 * @param userId
	 * @param impression
	 * @return
	 */
	Result<Integer> updateImpression (int userId, String impression);
	
	/**
	 * 插入一个用户
	 * @param loginName
	 * @param password
	 * @return
	 */
	Result<User> insertUser (String loginName, String password);
	
	/**
	 * 根据 userId 得到用户资料信息
	 * @param userId
	 * @return
	 */
	Result<User> getUserById (int userId);
	
	/**
	 * 修改昵称
	 * @param userId
	 * @param nickName
	 * @return
	 */
	Result<Integer> updateNickName (int userId, String nickName);
	
	/**
	 * 根据昵称关键字搜索用户
	 * @param nickName
	 * @return
	 */
	List<User> searchUser (String nickName);
}
