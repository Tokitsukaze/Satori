package moe.harusame.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
			return new Result<User>(400, "用户名或密码错误啦", null);
		} else {
			return new Result<User>(200, "登陆成功", user);
		}
	}

	@Override
	public Result<User> loginNameCheck(String loginName) {
		User user = userDao.loginNameCheck(loginName);
		if (user == null) {
			return new Result<User>(401, "用户名已经被占用", null);
		} else {
			return new Result<User>(200, "登录名可用", null);
		}
	}

	@Override
	public Result<User> nickNameCheck(String nickName) {
		User user = userDao.nickNameCheck(nickName);
		if (user == null) {
			return new Result<User>(402, "昵称已经被占用", null);
		} else {
			return new Result<User>(200, "昵称可用", null);
		}
	}

	@Override
	public Result<Integer> updateInfo(int userId, String info) {
		int effectLines = userDao.updateInfo(userId, info);
		if (effectLines == 1) {
			return new Result<Integer>(200, "修改信息成功", null);
		} else {
			return new Result<Integer>(403, "修改信息失败", null);
		}
	}

	@Override
	public Result<Integer> updateAvatar(int userId, String avatar) {
		int effectLines = userDao.updateAvatar(userId, avatar);
		if (effectLines == 1) {
			return new Result<Integer>(200, "修改头像成功", null);
		} else {
			return new Result<Integer>(404, "修改头像失败", null);
		}
	}

	@Override
	public Result<Integer> updateImpression(int userId, String impression) {
		int effectLines = userDao.updateImpression(userId, impression);
		if (effectLines == 1) {
			return new Result<Integer>(200, "修改印象成功", null);
		} else {
			return new Result<Integer>(405, "修改印象失败", null);
		}
	}

	@Override
	public Result<User> insertUser(String loginName, String password) {
		int result = userDao.insertUser(loginName, password); // 如果插入成功
		User user = null;
		if (result == 1) { // 返回新的用户对象模型
			user = userDao.login(loginName, password);
			return new Result<User>(200, "创建成功", user);
		} else {
			return new Result<User>(200, "创建成功", null);
		}
		
	}
}
