/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50545
Source Host           : localhost:3306
Source Database       : satori

Target Server Type    : MYSQL
Target Server Version : 50545
File Encoding         : 65001

Date: 2017-05-22 02:33:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for component
-- ----------------------------
DROP TABLE IF EXISTS `component`;
CREATE TABLE `component` (
  `component_id` int(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tagname` varchar(20) NOT NULL,
  `props` varchar(300) NOT NULL,
  `text` varchar(300) DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`component_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of component
-- ----------------------------

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `friend_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `state_friend` int(11) NOT NULL DEFAULT '1',
  `state_user` int(11) NOT NULL DEFAULT '1',
  `meet_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES ('1000', '1001', '0', '0', '2017-05-20 22:40:55');
INSERT INTO `friend` VALUES ('1000', '1013', '0', '0', '2017-05-20 23:15:49');
INSERT INTO `friend` VALUES ('1009', '1000', '0', '0', '2017-05-20 23:33:01');
INSERT INTO `friend` VALUES ('1000', '1010', '0', '0', '2017-05-21 10:45:13');

-- ----------------------------
-- Table structure for group_info
-- ----------------------------
DROP TABLE IF EXISTS `group_info`;
CREATE TABLE `group_info` (
  `project_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_info
-- ----------------------------

-- ----------------------------
-- Table structure for group_message
-- ----------------------------
DROP TABLE IF EXISTS `group_message`;
CREATE TABLE `group_message` (
  `project_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message_content` varchar(300) NOT NULL,
  `state` int(11) NOT NULL DEFAULT '0',
  `send_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_message
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目id',
  `creator` int(11) NOT NULL COMMENT '创建者id',
  `name` varchar(20) NOT NULL COMMENT '项目名字',
  `info` varchar(100) NOT NULL COMMENT '项目信息',
  `logo` varchar(100) NOT NULL DEFAULT 'default-avatar.jpg' COMMENT '项目logo',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '项目创建时间',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '项目状态',
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_create_date` (`create_date`)
) ENGINE=InnoDB AUTO_INCREMENT=1016 DEFAULT CHARSET=utf8 COMMENT='项目表';

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('1000', '1000', '大学社团管理系统', '简单的社团管理系统哦', 'project-1000-manager.jpg', '2017-05-13 21:40:13', '0');
INSERT INTO `project` VALUES ('1001', '1000', '图书管理系统', '简单的图书管理系统', 'project-1000-book.jpg', '2017-05-15 15:08:47', '0');
INSERT INTO `project` VALUES ('1002', '1000', 'Demo', '用来测试毕业设计的项目', 'project-1002-Demo', '2017-05-15 17:23:40', '0');
INSERT INTO `project` VALUES ('1006', '1000', 'kneeso', 'kneeso', 'default-avatar.jpg', '2017-05-20 15:30:05', '0');
INSERT INTO `project` VALUES ('1007', '1000', '测试项目2', '123', 'default-avatar.jpg', '2017-05-20 15:36:03', '0');
INSERT INTO `project` VALUES ('1008', '1012', '蕾姆的毕业设计~', '没什么用的项目', 'default-avatar.jpg', '2017-05-20 15:42:54', '0');
INSERT INTO `project` VALUES ('1010', '1012', '蕾姆的毕业设计2', '123456', 'default-avatar.jpg', '2017-05-20 15:43:49', '0');
INSERT INTO `project` VALUES ('1011', '1000', '毕业设计示例', '不怎么样的项目', 'default-avatar.jpg', '2017-05-21 00:07:26', '0');
INSERT INTO `project` VALUES ('1012', '1010', 'test', 'Just a test', 'default-avatar.jpg', '2017-05-21 10:46:24', '0');
INSERT INTO `project` VALUES ('1013', '1010', 'test2', 'Just a test2', 'default-avatar.jpg', '2017-05-21 10:52:14', '0');
INSERT INTO `project` VALUES ('1014', '1013', '测试项目', '蛤蛤！', 'default-avatar.jpg', '2017-05-21 12:33:02', '0');
INSERT INTO `project` VALUES ('1015', '1000', '新的项目', '没什么用的项目', 'default-avatar.jpg', '2017-05-22 01:40:27', '0');

-- ----------------------------
-- Table structure for prototype
-- ----------------------------
DROP TABLE IF EXISTS `prototype`;
CREATE TABLE `prototype` (
  `prototype_id` int(20) NOT NULL,
  `tab_id` int(11) NOT NULL,
  `tagname` varchar(20) NOT NULL,
  `props` varchar(300) NOT NULL,
  `text` varchar(300) DEFAULT NULL,
  `comment` varchar(300) NOT NULL,
  `update_date` int(13) NOT NULL,
  `branch_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prototype
-- ----------------------------
INSERT INTO `prototype` VALUES ('0', '32', 'div', 'top:106px;left:281px;width:80px;height:80px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('1', '32', 'div', 'top:183px;left:304px;width:3px;height:46px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('2', '32', 'div', 'top:184px;left:333px;width:3px;height:46px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('0', '31', 'div', 'top:136px;left:289px;width:96px;height:96px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('1', '31', 'div', 'top:230px;left:322px;width:2px;height:29px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('2', '31', 'div', 'top:235px;left:348px;width:3px;height:66px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('4', '31', 'div', 'top:96px;left:282px;width:111px;height:18px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('6', '31', 'div', 'top:111px;left:312px;width:48px;height:11px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('7', '31', 'div', 'top:147px;left:267px;width:7px;height:39px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('8', '31', 'div', 'top:154px;left:402px;width:7px;height:59px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('9', '31', 'div', 'top:81px;left:318px;width:4px;height:17px;', '', '', '2147483647', '0');
INSERT INTO `prototype` VALUES ('10', '31', 'div', 'top:68px;left:353px;width:4px;height:31px;', '', '', '2147483647', '0');

-- ----------------------------
-- Table structure for tab
-- ----------------------------
DROP TABLE IF EXISTS `tab`;
CREATE TABLE `tab` (
  `tab_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0',
  `branch` int(11) NOT NULL DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tab_id`),
  KEY `idx_update_date` (`update_date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tab
-- ----------------------------
INSERT INTO `tab` VALUES ('4', '1002', '主页面', '0', '0', '2017-05-15 17:32:17');
INSERT INTO `tab` VALUES ('5', '1002', '测试页面', '-1', '0', '2017-05-15 17:32:30');
INSERT INTO `tab` VALUES ('6', '1002', '岛风酱desu2', '-1', '0', '2017-05-19 15:26:46');
INSERT INTO `tab` VALUES ('19', '1002', '而是', '-1', '0', '2017-05-19 15:29:33');
INSERT INTO `tab` VALUES ('20', '1002', '二十231', '-1', '0', '2017-05-19 15:32:43');
INSERT INTO `tab` VALUES ('21', '1002', '1231', '-1', '0', '2017-05-19 15:32:47');
INSERT INTO `tab` VALUES ('22', '1002', '毕设测试', '0', '0', '2017-05-19 16:48:16');
INSERT INTO `tab` VALUES ('23', '1002', 'harusameDesu!', '0', '0', '2017-05-19 16:53:06');
INSERT INTO `tab` VALUES ('24', '1001', '你好！', '-1', '0', '2017-05-19 16:59:40');
INSERT INTO `tab` VALUES ('25', '1001', '测试用', '0', '0', '2017-05-19 17:00:06');
INSERT INTO `tab` VALUES ('26', '1011', '毕业设计的tab', '0', '0', '2017-05-21 00:21:51');
INSERT INTO `tab` VALUES ('27', '1012', '毕业测试', '-1', '0', '2017-05-21 10:46:48');
INSERT INTO `tab` VALUES ('28', '1012', 'Rem test', '0', '0', '2017-05-21 10:51:57');
INSERT INTO `tab` VALUES ('29', '1000', '最基础的', '0', '0', '2017-05-21 16:41:17');
INSERT INTO `tab` VALUES ('30', '1006', '过膝袜', '0', '0', '2017-05-21 20:09:41');
INSERT INTO `tab` VALUES ('31', '1000', '图片', '0', '0', '2017-05-22 01:36:52');
INSERT INTO `tab` VALUES ('32', '1015', '可能是一个插头', '0', '0', '2017-05-22 01:44:58');
INSERT INTO `tab` VALUES ('33', '1015', '另外一个', '0', '0', '2017-05-22 01:46:55');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '�û�id',
  `login_name` varchar(20) NOT NULL COMMENT '�û���¼��',
  `password` varchar(20) NOT NULL COMMENT '�û�����',
  `nick_name` varchar(20) NOT NULL COMMENT '�ǳ�',
  `avatar` varchar(100) NOT NULL DEFAULT 'default-avatar.jpg',
  `impression` varchar(100) NOT NULL DEFAULT 'default-impression.jpg',
  `info` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `signup_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '�û�����ʱ��',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '�û�״̬',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login_name` (`login_name`),
  KEY `idx_signup_date` (`signup_date`)
) ENGINE=InnoDB AUTO_INCREMENT=1014 DEFAULT CHARSET=utf8 COMMENT='�û���';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1000', 'admin', 'admin', '春雨棲姬', '1000-1495259851274-avatar.png', '1000-1495203354268-impression.jpeg', '我是白露级驱逐舰五番舰的春雨。', 'i@harusame.moe', '2017-05-13 21:25:10', '0');
INSERT INTO `user` VALUES ('1001', 'demo', 'demo', 'Kizuna AI', '1001-1495250032083-avatar.jpeg', '1001-1495248646230-impression.png', '世界上第一个虚拟Youtuber(自称)', '', '2017-05-13 22:37:37', '0');
INSERT INTO `user` VALUES ('1009', 'ltltc3', 'ltltc3', '1231213', 'default-avatar.jpg', 'default-impression.jpg', '', '', '2017-05-14 16:47:08', '0');
INSERT INTO `user` VALUES ('1010', 'ltltc2', 'ltltc2', 'Shigure', '1010-1495331476456-avatar.jpeg', '1010-1495331493918-impression.png', 'Shigure desu', '', '2017-05-14 16:48:03', '0');
INSERT INTO `user` VALUES ('1011', 'ltltc4', 'ltltc4', 'Myubosu', 'default-avatar.jpg', 'default-impression.jpg', '', '', '2017-05-20 11:45:26', '0');
INSERT INTO `user` VALUES ('1012', 'ltl123', 'ltltc2', '蕾姆りん', '1012-1495262504982-avatar.jpeg', '1012-1495263328414-impression.jpeg', '测试毕业设计等等！', '', '2017-05-20 15:38:03', '0');
INSERT INTO `user` VALUES ('1013', 'harusame', 'ltltc2', '驱逐棲姬', '1013-1495289729607-avatar.jpeg', '1013-1495289735172-impression.jpeg', '想穿长筒袜的深海棲姬', '', '2017-05-20 23:14:01', '0');

-- ----------------------------
-- Table structure for whisper
-- ----------------------------
DROP TABLE IF EXISTS `whisper`;
CREATE TABLE `whisper` (
  `message_id` int(20) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message_content` varchar(300) NOT NULL,
  `send_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of whisper
-- ----------------------------
INSERT INTO `whisper` VALUES ('1', '1013', '1000', '我是驱逐棲姬的说...', '2017-05-21 02:43:55', '0');
INSERT INTO `whisper` VALUES ('2', '1013', '1000', '再一次打招呼！', '2017-05-21 02:44:38', '0');
INSERT INTO `whisper` VALUES ('3', '1000', '1013', 'こんにちは~', '2017-05-21 02:59:59', '0');
INSERT INTO `whisper` VALUES ('4', '1000', '1013', '你好', '2017-05-21 03:03:08', '0');
INSERT INTO `whisper` VALUES ('5', '1013', '1000', '收到啦!', '2017-05-21 03:03:21', '0');
INSERT INTO `whisper` VALUES ('6', '1010', '1000', '你好！', '2017-05-21 11:08:33', '0');
INSERT INTO `whisper` VALUES ('7', '1010', '1000', '你好！', '2017-05-21 11:10:32', '0');
INSERT INTO `whisper` VALUES ('8', '1010', '1000', '你好！', '2017-05-21 11:10:35', '0');
INSERT INTO `whisper` VALUES ('9', '1010', '1000', '你好！', '2017-05-21 11:10:52', '0');
INSERT INTO `whisper` VALUES ('10', '1010', '1000', '你好12313', '2017-05-21 11:10:57', '0');
INSERT INTO `whisper` VALUES ('11', '1010', '1000', '123', '2017-05-21 11:18:09', '0');
INSERT INTO `whisper` VALUES ('12', '1010', '1000', '123', '2017-05-21 11:18:13', '0');
INSERT INTO `whisper` VALUES ('13', '1010', '1000', '尼壕', '2017-05-21 11:20:37', '0');
INSERT INTO `whisper` VALUES ('14', '1000', '1013', '你好!', '2017-05-21 12:22:51', '0');
INSERT INTO `whisper` VALUES ('15', '1013', '1000', 'zaima ?', '2017-05-21 12:27:16', '0');
INSERT INTO `whisper` VALUES ('25', '1000', '1013', '你好！', '2017-05-21 12:31:32', '0');
INSERT INTO `whisper` VALUES ('26', '1013', '1000', '额i！?', '2017-05-21 12:33:45', '0');
INSERT INTO `whisper` VALUES ('27', '1000', '1013', '这是为什么啦！', '2017-05-21 12:33:55', '0');
INSERT INTO `whisper` VALUES ('28', '1000', '1013', '你好！', '2017-05-21 12:45:42', '0');
INSERT INTO `whisper` VALUES ('29', '1013', '1000', '嗯嗯....', '2017-05-21 12:45:49', '0');
INSERT INTO `whisper` VALUES ('30', '1013', '1000', 'O(∩_∩)O哈哈~~', '2017-05-21 12:47:06', '0');
INSERT INTO `whisper` VALUES ('31', '1000', '1013', '1', '2017-05-21 12:47:19', '0');
INSERT INTO `whisper` VALUES ('32', '1000', '1013', '2', '2017-05-21 12:47:20', '0');
INSERT INTO `whisper` VALUES ('33', '1000', '1013', '3', '2017-05-21 12:47:21', '0');
INSERT INTO `whisper` VALUES ('34', '1013', '1000', '你好！', '2017-05-21 12:47:27', '0');
INSERT INTO `whisper` VALUES ('35', '1013', '1000', '233', '2017-05-21 12:47:43', '0');
INSERT INTO `whisper` VALUES ('36', '1000', '1013', '你好！', '2017-05-21 13:15:36', '0');
INSERT INTO `whisper` VALUES ('37', '1000', '1013', '123123', '2017-05-21 14:36:12', '0');
INSERT INTO `whisper` VALUES ('38', '1000', '1013', '123', '2017-05-21 14:44:02', '0');
INSERT INTO `whisper` VALUES ('39', '1000', '1013', '你好！', '2017-05-21 14:48:51', '0');
INSERT INTO `whisper` VALUES ('40', '1000', '1013', '12313', '2017-05-21 15:36:36', '0');
INSERT INTO `whisper` VALUES ('41', '1000', '1013', '啊哈哈！', '2017-05-21 15:38:27', '0');
INSERT INTO `whisper` VALUES ('42', '1000', '1010', '嗯呢！', '2017-05-21 15:51:00', '0');