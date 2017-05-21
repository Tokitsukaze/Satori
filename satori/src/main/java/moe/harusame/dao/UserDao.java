package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.User;

public interface UserDao {
	
	/**
	 * ���� userId ��� user
	 * @param userId
	 * @return
	 */
	User getUserById (int userId);
	
	/**
	 * �û���¼��֤
	 * @param loginName
	 * @param password
	 * @return ���User��Ϊ�գ���ô��½�ɹ�
	 */
	User login (@Param("loginName") String loginName, @Param("password") String password);
	
	/**
	 * ����¼���Ƿ����
	 * @param loginName
	 * @return
	 */
	User loginNameCheck (String loginName);
	
	/**
	 * ����ǳ��Ƿ����
	 * @param nickName
	 * @return
	 */
	User nickNameCheck (String nickName);
	
	/**
	 * ���¼��
	 * @param userId
	 * @param info
	 * @return
	 */
	int updateInfo (@Param("userId") int userId, @Param("info") String info);
	
	/**
	 * �����ǳ�
	 * @param userId
	 * @param nickName
	 * @return
	 */
	int updateNickName (@Param("userId") int userId, @Param("nickName") String nickName);
	
	/**
	 * ����ͷ��
	 * @param userId
	 * @param avatar
	 * @return
	 */
	int updateAvatar (@Param("userId") int userId, @Param("avatar") String avatar);
	
	/**
	 * ����ӳ��ͼ
	 * @param userId
	 * @param impression
	 * @return
	 */
	int updateImpression (@Param("userId") int userId, @Param("impression") String impression);
	
	/**
	 * ����һ���û�
	 * @param loginName
	 * @param password
	 * @return
	 */
	int insertUser (@Param("loginName") String loginName, @Param("password") String password, @Param("nickName") String nickName);
	
	/**
	 * �����û����ǳƹؼ��ֲ�ѯ�û�
	 * @param nickName
	 * @return
	 */
	List<User> searchUser (String nickName);
}
