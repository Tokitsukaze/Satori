package moe.harusame.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import moe.harusame.entity.Whisper;

public interface WhisperDao {
	int insertWhisper(@Param("senderId") int senderId, @Param("receiverId") int receiverId, @Param("messageContent") String messageContent);
	
	List<Whisper> getWhisperList(int receiverId);
}
