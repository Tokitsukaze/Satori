package moe.harusame.service;

import java.util.List;

import moe.harusame.dto.Result;
import moe.harusame.entity.User;

public interface UserService {
	
	/**
	 * �û���¼��֤
	 * @param loginName
	 * @param password
	 * @return ���User��Ϊ�գ���ô��½�ɹ�
	 */
	Result<User> login (String loginName, String password);
	
	/**
	 * ����¼���Ƿ����
	 * @param loginName
	 * @return
	 */
	Result<User> loginNameCheck (String loginName);
	
	/**
	 * ����ǳ��Ƿ����
	 * @param nickName
	 * @return
	 */
	Result<User> nickNameCheck (String nickName);
	
	/**
	 * ���¼��
	 * @param userId
	 * @param info
	 * @return
	 */
	Result<Integer> updateInfo (int userId, String info);
	
	/**
	 * ����ͷ��
	 * @param userId
	 * @param avatar
	 * @return
	 */
	Result<Integer> updateAvatar (int userId, String avatar);
	
	/**
	 * ����ӳ��ͼ
	 * @param userId
	 * @param impression
	 * @return
	 */
	Result<Integer> updateImpression (int userId, String impression);
	
	/**
	 * ����һ���û�
	 * @param loginName
	 * @param password
	 * @return
	 */
	Result<User> insertUser (String loginName, String password);
	
	/**
	 * ���� userId �õ��û�������Ϣ
	 * @param userId
	 * @return
	 */
	Result<User> getUserById (int userId);
	
	/**
	 * �޸��ǳ�
	 * @param userId
	 * @param nickName
	 * @return
	 */
	Result<Integer> updateNickName (int userId, String nickName);
	
	/**
	 * �����ǳƹؼ��������û�
	 * @param nickName
	 * @return
	 */
	List<User> searchUser (String nickName);
}
