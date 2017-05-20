package moe.harusame.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import moe.harusame.dao.UserDao;
import moe.harusame.dto.Result;
import moe.harusame.entity.User;
import moe.harusame.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	public Result<User> login(String loginName, String password) {
		User user = userDao.login(loginName, password);
		if (user == null) {
			return new Result<User>("400", "用户名或密码错误啦", null);
		} else {
			return new Result<User>("200", "登陆成功", user);
		}
	}

	@Override
	public Result<User> loginNameCheck(String loginName) {
		User user = userDao.loginNameCheck(loginName);
		if (user != null) {
			return new Result<User>("401", "用户名已经被占用", null);
		} else {
			return new Result<User>("200", "登录名可用", null);
		}
	}

	@Override
	public Result<User> nickNameCheck(String nickName) {
		User user = userDao.nickNameCheck(nickName);
		if (user != null) {
			return new Result<User>("402", "昵称已经被占用", null);
		} else {
			return new Result<User>("200", "昵称可用", null);
		}
	}

	@Override
	public Result<Integer> updateInfo(int userId, String info) {
		int effectLines = userDao.updateInfo(userId, info);
		if (effectLines == 1) {
			return new Result<Integer>("200", "修改信息成功", null);
		} else {
			return new Result<Integer>("403", "修改信息失败", null);
		}
	}

	@Override
	public Result<Integer> updateAvatar(int userId, String avatar) {
		int effectLines = userDao.updateAvatar(userId, avatar);
		if (effectLines == 1) {
			return new Result<Integer>("200", "修改头像成功", null);
		} else {
			return new Result<Integer>("404", "修改头像失败", null);
		}
	}

	@Override
	public Result<Integer> updateImpression(int userId, String impression) {
		int effectLines = userDao.updateImpression(userId, impression);
		if (effectLines == 1) {
			return new Result<Integer>("200", "修改印象成功", null);
		} else {
			return new Result<Integer>("405", "修改印象失败", null);
		}
	}

	@Override
	public Result<User> insertUser(String loginName, String password) {
		int result = userDao.insertUser(loginName, password, getMD5(loginName, "loginName")); // 如果插入成功
		System.out.println("result:" + result);
		User user = null;
		if (result == 1) { // 返回新的用户对象模型
			user = userDao.login(loginName, password);
			return new Result<User>("200", "创建成功", user);
		} else {
			return new Result<User>("406", "创建失败", null);
		}
	}
	
	private String getMD5(String str, String salt) {
		String base = str + "/" + salt;
		String md5 = DigestUtils.md5DigestAsHex(base.getBytes());
		System.out.println("MD5:" + md5.substring(0, 10));
		return md5.substring(0, 10);
	}

	@Override
	public Result<User> getUserById(int userId) {
		User user = userDao.getUserById(userId);
		if (user == null) {
			return new Result<User>("407", "找不到该用户", null);
		} else {
			return new Result<User>("200", "查询成功", user);
		}
	}
	
	@Override
	public Result<Integer> updateNickName(int userId, String nickName) {
		int effectLines = userDao.updateNickName(userId, nickName);
		if (effectLines == 1) {
			return new Result<Integer>("200", "修改昵称成功", null);
		} else {
			return new Result<Integer>("403", "修改昵称失败", null);
		}
	}

	@Override
	public List<User> searchUser(String nickName) {
		return userDao.searchUser(nickName);
	}
}
