-- ���ݿ��ʼ��ģ��

-- �������ݿ�
CREATE DATABASE satori;
-- ʹ�����ݿ�
use seckill;
-- �����û���
CREATE TABLE user(
`user_id` int NOT NULL AUTO_INCREMENT COMMENT '�û�id',
`login_name` varchar(20) NOT NULL UNIQUE COMMENT '�û���¼��',
`password` varchar(20) NOT NULL COMMENT '�û�����',
`nick_name` varchar(20) NOT NULL COMMENT '�ǳ�',
`avatar` varchar(100) NOT NULL COMMENT '�û�ͷ���ַ',
`impression` varchar(100) NOT NULL COMMENT '�û�ӳ���ַ',
`info` varchar(100) NOT NULL COMMENT '�û�ͷ���ַ',
`email` varchar(100) NOT NULL UNIQUE COMMENT '�û�����',
`signup_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '�û�����ʱ��',
`state` tinyint NOT NULL DEFAULT 0 COMMENT '�û�״̬',
PRIMARY KEY (user_id),
key idx_signup_date(signup_date)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='�û���';

-- ������Ŀ��
CREATE TABLE project(
`project_id` int NOT NULL AUTO_INCREMENT COMMENT '��Ŀid',
`creator` int NOT NULL COMMENT '������id',
`name` varchar(20) NOT NULL UNIQUE COMMENT '��Ŀ����',
`info` varchar(100) NOT NULL COMMENT '��Ŀ��Ϣ',
`logo` varchar(100) NOT NULL COMMENT '��Ŀlogo',
`create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '��Ŀ����ʱ��',
`state` tinyint NOT NULL DEFAULT 0 COMMENT '��Ŀ״̬',
)
PRIMARY KEY (project_id, creator),
key idx_create_date(create_date)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='��Ŀ��';


-- �������ݿ����̨
mysql -uroot -proot

    