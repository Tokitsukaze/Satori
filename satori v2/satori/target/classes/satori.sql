-- 数据库初始化模块

-- 创建数据库
CREATE DATABASE satori;
-- 使用数据库
use seckill;
-- 创建用户表
CREATE TABLE user(
`user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
`login_name` varchar(20) NOT NULL UNIQUE COMMENT '用户登录名',
`password` varchar(20) NOT NULL COMMENT '用户密码',
`nick_name` varchar(20) NOT NULL COMMENT '昵称',
`avatar` varchar(100) NOT NULL COMMENT '用户头像地址',
`impression` varchar(100) NOT NULL COMMENT '用户映像地址',
`info` varchar(100) NOT NULL COMMENT '用户头像地址',
`email` varchar(100) NOT NULL UNIQUE COMMENT '用户邮箱',
`signup_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '用户创建时间',
`state` tinyint NOT NULL DEFAULT 0 COMMENT '用户状态',
PRIMARY KEY (user_id),
key idx_signup_date(signup_date)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 创建项目表
CREATE TABLE project(
`project_id` int NOT NULL AUTO_INCREMENT COMMENT '项目id',
`creator` int NOT NULL COMMENT '创建者id',
`name` varchar(20) NOT NULL UNIQUE COMMENT '项目名字',
`info` varchar(100) NOT NULL COMMENT '项目信息',
`logo` varchar(100) NOT NULL COMMENT '项目logo',
`create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '项目创建时间',
`state` tinyint NOT NULL DEFAULT 0 COMMENT '项目状态',
)
PRIMARY KEY (project_id, creator),
key idx_create_date(create_date)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='项目表';


-- 连接数据库控制台
mysql -uroot -proot

    