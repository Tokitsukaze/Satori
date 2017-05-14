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
		String nickName = "春雨棲姬";
		User user = userDao.nickNameCheck(nickName);
		System.out.println(user);
	}
	
	@Test
	public void updateInfo() throws Exception {
		int userId = 1000;
		int result;
		result = userDao.updateInfo(userId, "		我是白露级驱逐舰五番舰的春雨。" +
		"好吃……才不是那种春雨呢！" +
		"与村雨还有夕立姐姐曾经一起组成第二驱逐队执行驱逐舰的海上巡逻任务！" +
		"对运输与护卫任务稍微比较擅长哟。嗯！ ");
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
