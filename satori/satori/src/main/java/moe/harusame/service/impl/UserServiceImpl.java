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
			return new Result<User>("400", "�û��������������", null);
		} else {
			return new Result<User>("200", "��½�ɹ�", user);
		}
	}

	@Override
	public Result<User> loginNameCheck(String loginName) {
		User user = userDao.loginNameCheck(loginName);
		if (user != null) {
			return new Result<User>("401", "�û����Ѿ���ռ��", null);
		} else {
			return new Result<User>("200", "��¼������", null);
		}
	}

	@Override
	public Result<User> nickNameCheck(String nickName) {
		User user = userDao.nickNameCheck(nickName);
		if (user != null) {
			return new Result<User>("402", "�ǳ��Ѿ���ռ��", null);
		} else {
			return new Result<User>("200", "�ǳƿ���", null);
		}
	}

	@Override
	public Result<Integer> updateInfo(int userId, String info) {
		int effectLines = userDao.updateInfo(userId, info);
		if (effectLines == 1) {
			return new Result<Integer>("200", "�޸���Ϣ�ɹ�", null);
		} else {
			return new Result<Integer>("403", "�޸���Ϣʧ��", null);
		}
	}

	@Override
	public Result<Integer> updateAvatar(int userId, String avatar) {
		int effectLines = userDao.updateAvatar(userId, avatar);
		if (effectLines == 1) {
			return new Result<Integer>("200", "�޸�ͷ��ɹ�", null);
		} else {
			return new Result<Integer>("404", "�޸�ͷ��ʧ��", null);
		}
	}

	@Override
	public Result<Integer> updateImpression(int userId, String impression) {
		int effectLines = userDao.updateImpression(userId, impression);
		if (effectLines == 1) {
			return new Result<Integer>("200", "�޸�ӡ��ɹ�", null);
		} else {
			return new Result<Integer>("405", "�޸�ӡ��ʧ��", null);
		}
	}

	@Override
	public Result<User> insertUser(String loginName, String password) {
		int result = userDao.insertUser(loginName, password, getMD5(loginName, "loginName")); // �������ɹ�
		System.out.println("result:" + result);
		User user = null;
		if (result == 1) { // �����µ��û�����ģ��
			user = userDao.login(loginName, password);
			return new Result<User>("200", "�����ɹ�", user);
		} else {
			return new Result<User>("406", "����ʧ��", null);
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
			return new Result<User>("407", "�Ҳ������û�", null);
		} else {
			return new Result<User>("200", "��ѯ�ɹ�", user);
		}
	}
	
	@Override
	public Result<Integer> updateNickName(int userId, String nickName) {
		int effectLines = userDao.updateNickName(userId, nickName);
		if (effectLines == 1) {
			return new Result<Integer>("200", "�޸��ǳƳɹ�", null);
		} else {
			return new Result<Integer>("403", "�޸��ǳ�ʧ��", null);
		}
	}

	@Override
	public List<User> searchUser(String nickName) {
		return userDao.searchUser(nickName);
	}
}
