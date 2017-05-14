package moe.harusame.dao;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import moe.harusame.entity.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "classpath:spring/spring-dao.xml" })
public class UserDaoTest {

	@Resource
	private UserDao userDao;
	
	String loginName = "admin";
	String password = "admin";
	
	@Test
	public void loginValidate() throws Exception {
		String loginName = "admin";
		String password = "admin";
		User user = userDao.login(loginName, password);
		System.out.println(user);
	}
	
	@Test
	public void loginNameCheck() throws Exception {
		String loginName = "admin2";
		User user = userDao.loginNameCheck(loginName);
		System.out.println(user);
	}
	
	@Test
	public void nickNameCheck() throws Exception {
		String nickName = "���ꗫ��";
		User user = userDao.nickNameCheck(nickName);
		System.out.println(user);
	}
	
	@Test
	public void updateInfo() throws Exception {
		int userId = 1000;
		int result;
		result = userDao.updateInfo(userId, "		���ǰ�¶�������巬���Ĵ��ꡣ" +
		"�óԡ����Ų������ִ����أ�" +
		"����껹��Ϧ���������һ����ɵڶ������ִ�����𽢵ĺ���Ѳ������" +
		"�������뻤��������΢�Ƚ��ó�Ӵ���ţ� ");
		System.out.println(result);
	}
	
	@Test
	public void insertUser() throws Exception {
		String loginName = "demo";
		String password = "demo";
		int user = userDao.insertUser(loginName, password);
		System.out.println(user);
	}
	
}
