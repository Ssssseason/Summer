# SUMMER 背单词网站

## 项目简介

B/S体系软件设计课程大程

## 技术栈
Django
REST framework
React
Redux

## 项目功能

#### 用户注册、登录功能
用户注册时需要填写必要的信息并验证，如用户名、密码要求在6字节以上，email的格式验证，并保证用户名和email在系统中唯一

#### 设置单词书
用户登录后可以设置需要背的单词集，如4级、6级等。单词集可以从网上收集，数量多少不影响评分。

#### 自定义单词
用户可以维护自己的自定义单词

#### 背诵、复习、考核
实现基本的背诵计划、复习、考核等功能，记录进度

#### 响应式布局
界面样式适配PC和手机的浏览器

#### 学习能力
具有一定的学习能力，能根据记忆曲线或用户的使用习惯调整背诵的内容

## 运行方式

- NodeJS, NPM最新版
- Python 3.5

#### 后端配置

1. 创建后端Python虚拟环境
2. 安装Python依赖
```bash
cd backend
pip install -r requirements.txt
```
3. 数据
数据库初始化数据有两种方式，建议直接使用db.sqlite3
	- 直接使用backend/db.sqlite3（跳到步骤4即可）
	- 删除数据库，重新migrate后
```bash
python manage.py loaddata initial.json
```
4. 开启后端服务
```bash
python manage.py runserver
```

#### 前端配置
1. 安装前端npm依赖：

```bash
cd frontend
npm install
```
2. 运行前端
```bash
npm start
```
#### 访问网站

`localhost:3000`

可用测试账号：`0000003`
密码：`123456789`
