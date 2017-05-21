;(function () {
	var Template = function () {
		this.layers
		this.$satori

		this.init()
	}



	Template.prototype = {
		constructor: Template,

		init: function () {
			/**
			 * 所有图层的挂载点
			 */
			this.$satori = document.getElementById("satori")

			/**
			 * 接受键盘事件
			 */
			this.$keyborad_inputer = VD.compile(e('textarea', {"style": "opacity: 0; position: absolute"}))

			this.$satori.appendChild(this.$keyborad_inputer)

			/**
			 * 所有图层
			 */
			this.layers = {
				$loading_layer: VD.compile(e('div', {'class': 'loading-layer'})),
				$mask_layer: VD.compile(e('div', {'class': 'mask-layer'})),
				// $branch_layer: VD.compile(e('div', {'class': 'branch-layer'})),
				$main_layer: VD.compile(e('div', {'class': 'main-layer'})),
				$effect_layer: VD.compile(e('div', {'class': 'effect-layer'})),
				// $chat_layer: VD.compile(e('div', {'class': 'chat-layer'})),
				$util_layer: VD.compile(e('div', {'class': 'util-layer'})),
				$skill_layer: VD.compile(e('div', {'class': 'skill-layer'})),
				$modal_layer: VD.compile(e('div', {'class': 'modal-layer', 'id': 'modal-layer'}))
			}

			var $fragment = document.createDocumentFragment()

			for (var layer in this.layers) {
				$fragment.appendChild(this.layers[layer])
			}

			this.$prototype_component = VD.compile(e("div", {'class': 'prototype-layer', "id": "prototype-layer"}))

			this.$satori.appendChild($fragment)
			// /**
			//  * mask 图层
			//  */
			// this.mask = VD.compile(e('div', {'class': 'mask'}))
		},

		prototype_component: function () {
			return this.$prototype_component
		},

		/**
		 * 顶部技能栏，未登录
		 */
		skill_top_false: function () {
			var $index = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/index"}, "首页")
			]))
			var $map = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/index"}, "地图")
			]))
			var $search = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/index"}, "搜索")
			]))
			var $signup = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/index"}, "注册")
			]))
			var $signin = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/index"}, "登陆")
			]))

			SatoriEvent.skill_top_index($index)
			SatoriEvent.skill_top_map($map)
			SatoriEvent.skill_top_search($search)
			SatoriEvent.skill_top_signup($signup)
			SatoriEvent.skill_top_signin($signin)

			return VD.compile(
				e("div", {"class": "skill-top-component"}, [
					e("div", {"class": "skill-list-container"}, [
						e("ul", {"class": "skill-list"}, [
							$index,
							$map,
							$search
						]),
						e("ul", {"class": "skill-list"}, [
							$signup,
							$signin
						])
					])
				])
			)
		},

		/**
		 * 顶部技能栏
		 */
		skill_top_true: function () {
			var $index = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/index"}, "首页")
			]))
			var $map = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/map"}, "地图")
			]))

			var $search_input = VD.compile(e("input", {"class": "skill-item-search", "placeholder": "搜索", "type": "text"}))
			var $search = VD.compile(e("li", {"class": "skill-item"}, [
				$search_input
			]))
			var $project = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/search"}, "项目")
			]))
			var $store = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/search"}, "仓库")
			]))
			var $note = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/search"}, "笔记")
			]))
			var $friends = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "href": "/satori/search"}, "好友")
			]))
			var $home = VD.compile(e("li", {"class": "skill-item"}, [
				e("a", {"class": "skill-item-link", "id": "skill-top-user-nick-name", "href": "/satori/search"}, SESSION_nickName)
			]))

			SatoriEvent.skill_top_index($index)
			SatoriEvent.skill_top_map($map)
			SatoriEvent.skill_top_search($search_input)
			SatoriEvent.skill_top_project($project)
			SatoriEvent.skill_top_store($store)
			SatoriEvent.skill_top_note($note)
			SatoriEvent.skill_top_friend($friends)
			SatoriEvent.skill_top_home($home)

			return VD.compile(
				e("div", {"class": "skill-top-component"}, [
					e("div", {"class": "skill-list-container"}, [
						e("ul", {"class": "skill-list"}, [
							$index,
							$map,
							$search
						]),
						e("ul", {"class": "skill-list"}, [
							$project,
							$store,
							$note,
							$friends,
							$home
						])
					])
				])
			)
		},

		/**
		 * 个人主页
		 */
		home: function () {
			setTimeout(function () {
				View.updateViewHome("project", $center, $card_list, $project_count)
				View.updateViewHomeUserInfo($name, $info, $avatar, $impression)
			})
			var $card_list = VD.compile(e("ul", {"class": "card-list", "id": "home-card-listlist"}))

			var $trend = VD.compile(e("a", {"class": "item-name"}, "动态"))

			var $project_count = VD.compile(e("span", {"class": "statistics-count", "id": "project-count"}, "0"))
			var $project = VD.compile(e("a", {"class": "item-name"}, "项目"))

			var $note = VD.compile(e("a", {"class": "item-name", "href": ""}, "笔记"))

			var $friends_count = VD.compile(e("span", {"class": "statistics-count"}, "0"))
			var $friends = VD.compile(e("a", {"class": "item-name", "href": ""}, "好友"))

			var $store_count = VD.compile(e("span", {"class": "statistics-count"}, "0"))
			var $store = VD.compile(e("a", {"class": "item-name", "href": ""}, "仓库"))
			var $setting = VD.compile(e("a", {"class": "item-name", "href": ""}, "设置"))

			var $center = VD.compile(
				e("div", {"class": "center", "id": "home-center"}, [
					$card_list
				])
			)

			SatoriEvent.home_center($center)

			SatoriEvent.home_trend($trend, $center, $card_list)
			SatoriEvent.home_project($project, $center, $card_list, $project_count)
			SatoriEvent.home_note($note, $center, $card_list)
			SatoriEvent.home_friend($friends, $center, $card_list, $friends_count )
			SatoriEvent.home_store($store, $center, $card_list, $store_count)
			SatoriEvent.home_setting($setting, $center, $card_list)

			var $name = VD.compile(e("h1", {"class": "user-name", "id": "user-nick-name"}))
			var $info = VD.compile(e("p", {"class": "user-introduce", "id": "user-info"}))
			var $impression = VD.compile(e("img", {"src": "assets/images/default-avatar.jpg", "class": "impression-5x", "id": "impression"}))
			var $avatar = VD.compile(e("img", {"src": "assets/images/default-impression.jpg", "class": "user-avatar-5x", "id": "avatar"}))

			var $btn_create_project = VD.compile(e("li", {"class": "create-menu-item"}, "创建项目"))
			var $btn_create_note = VD.compile(e("li", {"class": "create-menu-item"}, "创建笔记"))

			SatoriEvent.btn_create_project($btn_create_project)

			return VD.compile(
				e("div", {"class": "home-component"}, [
					e("div", {"class": "impression-component"}, [
						e("div", {"class": "impression-container"}, [
							$impression
						]),
					]),
					e("div", {"class": "statistics-component"}, [
						e("div", {"class": "user-avatar-container"}, [
							$avatar
						]),
						e("div", {"class": "statistics-container"}, [
							e("ul", {"class": "statistics-list"}, [
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}),
									$trend
								]),
								e("li", {"class": "statistics-item"}, [
									$project_count,
									$project
								]),
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}, "0"),
									$note
								]),
								e("li", {"class": "statistics-item"}, [
									$friends_count,
									$friends
								]),
								e("li", {"class": "statistics-item"}, [
									$store_count,
									$store
								]),
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}),
									$setting
								])
							]),
						]),
					]),
					e("div", {"class": "info-component-wrap"}, [
						e("div", {"class": "info-component"}, [
							e("div", {"class": "center-wrap"}, [
								$center
							]),
							e("div", {"class": "left"}, [
								e("div", {"class": "info-container"}, [
									$name,
									e("h2", {"class": "user-state"}),
									$info
								]),
							]),
							e("div", {"class": "right"}, [
								e("div", {"class": "create-menu-container"}, [
									e("ul", {"class": "create-menu-list"}, [
										$btn_create_project,
										$btn_create_note
									])
								])
							])
						])
					])
				])
			)
		},

		home_card_tip: function (v_data) {
			return VD.compile(
				e("div", {"class": "state-component"}, [
					e("div", {"class": "state-no-card"}, [
						e("span", {"class": "state-illustate"}, "还没有" + v_data + "哦"),
					])
				])
			)
		},

		/**
		 * home 下的设置
		 */
		home_setting: function (v_data) {
			var $setting_nickName = VD.compile(e("input", {"type": "text", "name": "nickName", "class": "r-input i-r-input", "placeholder": "不能为空的昵称", "value": v_data.nickName}))
			var $setting_nickNameTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $setting_info = VD.compile(e("textarea", {"type": "text","name": "info", "class": "r-input i-r-input", "placeholder": "个人信息", "style": "height: 200px; padding-top: 10px;"}, v_data.info))
			var $setting_infoTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $setting_avatar = VD.compile(e('input', {'type': 'file', 'accept': 'image/*', 'name': 'file'}))
			var $setting_avatarTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $setting_avatar_wrap = VD.compile(e('form', {'enctype': 'multipart/form-data', 'method': 'post'}, [
				e('div', {'class': 'avatar-wrapper'}, [
					$setting_avatar
				]),
				$setting_avatarTip
			]))

			var $setting_impression = VD.compile(e('input', {'type': 'file', 'accept': 'image/*', 'name': 'file'}))
			var $setting_impressionTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $setting_impression_wrap = VD.compile(e('form', {'enctype': 'multipart/form-data', 'method': 'post'}, [
				e('div', {'class': 'avatar-wrapper'}, [
					$setting_impression
				]),
				$setting_impressionTip
			]))

			SatoriEvent.setting_nickName($setting_nickName, $setting_nickNameTip)
			SatoriEvent.setting_info($setting_info, $setting_infoTip)
			SatoriEvent.setting_avatar($setting_avatar, $setting_avatarTip, $setting_avatar_wrap)
			SatoriEvent.setting_impression($setting_impression, $setting_impressionTip, $setting_impression_wrap)

			return VD.compile(
				e("ul", {"class": "card-list"}, [
					e("li", {"class": "card-item type-input"}, [
						e("div", {"class": "left"}, [
							e("div", {"class": "card-avatar-container"}, [
								e("img", {"src": "", "alt": "昵称", "class": "card-avatar-5x"})
							]),
						]),
						e("div", {"class": "right"}, [
							e("div", {"class": "info-container"}, [
								$setting_nickName,
								$setting_nickNameTip,
								e("ul", {"class": "condition-list"}, [
									e("li", {"class": "condition-item"}, "一位以上"),
									e("li", {"class": "condition-item"}, "二十位以下"),
									e("li", {"class": "condition-item"}, "特殊标点符号除外")
								]),
							])
						])
					]),
					e("li", {"class": "card-item type-input"}, [
						e("div", {"class": "left"}, [
							e("div", {"class": "card-avatar-container"}, [
								e("img", {"src": "", "alt": "信息", "class": "card-avatar-5x"})
							]),
						]),
						e("div", {"class": "right"}, [
							e("div", {"class": "info-container"}, [
								$setting_info,
								$setting_infoTip
							])
						])
					]),
					e("li", {"class": "card-item type-input"}, [
						e("div", {"class": "left"}, [
							e("div", {"class": "card-avatar-container"}, [
								e("img", {"src": "", "alt": "头像", "class": "card-avatar-5x"})
							]),
						]),
						e("div", {"class": "right"}, [
							e("div", {"class": "info-container"}, [
								$setting_avatar_wrap
							])
						])
					]),
					e("li", {"class": "card-item type-input"}, [
						e("div", {"class": "left"}, [
							e("div", {"class": "card-avatar-container"}, [
								e("img", {"src": "", "alt": "印象", "class": "card-avatar-5x"})
							]),
						]),
						e("div", {"class": "right"}, [
							e("div", {"class": "info-container"}, [
								$setting_impression_wrap
							])
						])
					])
				])
			)
		},




		/**
		 * 注册页面
		 */
		signup: function () {
			var $loginName = VD.compile(e("input", {"type": "text", "name": "loginName", "class": "r-input i-r-input", "placeholder": "登陆用的用户名，不是昵称哦"}))
			var $loginNameTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $password = VD.compile(e("input", {"type": "text", "name": "password", "class": "r-input i-r-input", "placeholder": "登陆用的验证密码"}))
			var $passwordTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $password_again = VD.compile(e("input", {"type": "text", "class": "r-input i-r-input", "placeholder": "保证跟上面一样"}))
			var $password_againTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $signup_button = VD.compile(e("div", {"class": "next r-submit i-r-submit"}, "确认注册"))

			SatoriEvent.input_signup_loginName($loginName, $loginNameTip)
			SatoriEvent.input_signup_password($password, $passwordTip)
			SatoriEvent.input_signup_password_again($password_again, $password, $password_againTip)
			SatoriEvent.input_signup_button($signup_button, $loginName, $password)

			return VD.compile(
				e("div", {"class": "signup-component"}, [
					e("ul", {"class": "card-list part_one"}, [
						e("li", {"class": "card-item type-input"}, [
							e("div", {"class": "card-wrap"}, [
								e("div", {"class": "left"}, [
									e("div", {"class": "card-avatar-container"}, [
										e("span", {"class": "card-illustate"}, "用户名")
									]),
								]),
								e("div", {"class": "right"}, [
									e("div", {"class": "info-container"}, [
										$loginName,
										$loginNameTip,
										e("ul", {"class": "condition-list"}, [
											e("li", {"class": "condition-item"}, "六位以上"),
											e("li", {"class": "condition-item"}, "二十位以下"),
											e("li", {"class": "condition-item"}, "数字 字母 下划线组成"),
											e("li", {"class": "condition-item"}, "开头不能是数字")
										])
									])
								])
							])
						]),
						e("li", {"class": "card-item type-input"}, [
							e("div", {"class": "card-wrap"}, [
								e("div", {"class": "left"}, [
									e("div", {"class": "card-avatar-container"}, [
										e("span", {"class": "card-illustate"}, "密码")
									]),
								]),
								e("div", {"class": "right"}, [
									e("div", {"class": "info-container"}, [
										$password,
										$passwordTip,
										e("ul", {"class": "condition-list"}, [
											e("li", {"class": "condition-item"}, "六位以上"),
											e("li", {"class": "condition-item"}, "二十位以下"),
											e("li", {"class": "condition-item"}, "含有数字"),
											e("li", {"class": "condition-item"}, "含有小写字母"),
											e("li", {"class": "condition-item"}, "含有大写字母")
										])
									])
								])
							])
						]),
						e("li", {"class": "card-item type-input"}, [
							e("div", {"class": "card-wrap"}, [
								e("div", {"class": "left"}, [
									e("div", {"class": "card-avatar-container"}, [
										e("span", {"class": "card-illustate"}, "重复密码")
									]),
								]),
								e("div", {"class": "right"}, [
									e("div", {"class": "info-container"}, [
										$password_again,
										$password_againTip,
										e("ul", {"class": "condition-list"}, [
											e("li", {"class": "condition-item"}, "与密码相同")
										])
									])
								])
							])
						]),
						e("li", {"class": "operation-container"}, [
							$signup_button
						])
					])
				])
			)
		},

		signin: function () {
			var $loginName = VD.compile(e("input", {"type": "text", "name": "loginName", "class": "r-input i-r-input", "placeholder": "登陆的用户名"}))
			var $loginNameTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $password = VD.compile(e("input", {"type": "text", "name": "password", "class": "r-input i-r-input", "placeholder": "登陆密码"}))
			var $passwordTip = VD.compile(e("span", {"class": "i-r-result"}))

			var $signin_submit = VD.compile(e("div", {"class": "r-submit i-r-submit"}, "登陆"))


			SatoriEvent.input_signin_loginName($loginName, $loginNameTip)
			SatoriEvent.input_signin_password($password, $passwordTip)
			SatoriEvent.input_signin_submit($signin_submit, $loginName, $password)

			return VD.compile(
				e("div", {"class": "signin-component"}, [
					e("ul", {"class": "card-list"}, [
						e("li", {"class": "card-item type-input"}, [
							e("div", {"class": "card-wrap"}, [
								e("div", {"class": "left"}, [
									e("div", {"class": "card-avatar-container"}, [
										e("span", {"class": "card-illustate"}, "用户名")
									]),
								]),
								e("div", {"class": "right"}, [
									e("div", {"class": "info-container"}, [
										$loginName,
										$loginNameTip,
									])
								])
							])
						]),
						e("li", {"class": "card-item type-input"}, [
							e("div", {"class": "card-wrap"}, [
								e("div", {"class": "left"}, [
									e("div", {"class": "card-avatar-container"}, [
										e("span", {"class": "card-illustate"}, "密码")
									]),
								]),
								e("div", {"class": "right"}, [
									e("div", {"class": "info-container"}, [
										$password,
										$passwordTip,
									])
								])
							])
						]),
						e("li", {"class": "operation-container"}, [
							$signin_submit
						])
					])
				])
			)
		},



		/**
		 * 卡片类型: 笔记
		 */
		type_note: function (v_data) {
			return VD.compile(
				e("li", {"class": "card-item type-note"}, [
					e("div", {"class": "left"}, [
						e("div", {"class": "card-avatar-container"}, [
							e("img", {"src": "", "alt": "笔记", "class": "card-avatar-5x"})
						]),
					]),
					e("div", {"class": "right"}, [
						e("div", {"class": "info-container"}, [
							e("span", {"class": "title"}, v_data.title),
							e("div", {"class": "date"}, v_data.date),
							e("p", {"class": "content"}, v_data.content)
						]),
					]),
				]),
			)
		},

		/**
		 * 卡片类型: 项目
		 */
		type_project: function (v_data) {
			return VD.compile(
				e("li", {"class": "card-item type-project"}, [
					e("div", {"class": "left"}, [
						e("div", {"class": "card-avatar-container"}, [
							e("img", {"src": "", "alt": "项目", "class": "card-avatar-5x"})
						]),
					]),
					e("div", {"class": "right"}, [
						e("div", {"class": "info-container"}, [
							e("a", {"class": "title", "s-link": "", "href": "/satori/project/" + v_data.id}, v_data.title),
							e("div", {"class": "date"}, v_data.date),
							e("p", {"class": "content"}, v_data.content)
						]),
					]),
				]),
			)
		},

		/**
		 * 卡片类型: 仓库
		 */
		type_store: function (v_data) {
			return VD.compile(
				e("li", {"class": "card-item type-store"}, [
					e("div", {"class": "left"}, [
						e("div", {"class": "card-avatar-container"}, [
							e("img", {"src": "", "alt": "仓库", "class": "card-avatar-5x"})
						]),
					]),
					e("div", {"class": "right"}, [
						e("div", {"class": "info-container"}, [
							e("span", {"class": "title"}, v_data.title),
							e("div", {"class": "date"}, v_data.date),
							e("p", {"class": "content"}, v_data.content)
						]),
					]),
				]),
			)
		},

		/**
		 * 卡片类型: 电波
		 */
		type_friend: function (v_data) {
			return VD.compile(
				e("li", {"class": "card-item type-denpa"}, [
					e("div", {"class": "left"}, [
						e("div", {"class": "card-avatar-container"}, [
							e("img", {"src": "assets/images/" + v_data.avatar, "alt": v_data.title, "class": "card-avatar-5x"})
						]),
					]),
					e("div", {"class": "right"}, [
						e("div", {"class": "info-container"}, [
							e("span", {"class": "title"}, v_data.title),
							e("p", {"class": "content"}, v_data.content)
						]),
					]),
				])
			)
		},

		/**
		 * home下的 card列表
		 */
		home_card_list: function (v_data) {
			var _this = this
			var card_data = v_data

			var $card_list = card_data.reduce(function (v_card_list, v_card_item) {
				var fn_name = "type_" + v_card_item.type
				v_card_list.appendChild(_this[fn_name](v_card_item))
				return v_card_list
			}, document.createDocumentFragment())


			return VD.compile(e("ul", {"class": "card-list"}, [$card_list]))
		},


		skill: function () {
			// VD.compile()
			var $avatar = VD.compile(e("img", {"class": "skill-avatar", "alt": SESSION_nickName, "src": "assets/images/" + SESSION_userAvatar}))

			SatoriEvent.skill_top_home($avatar)

			var $preview = VD.compile(e("span", {"class": "skill-name", "s-sign": "preview"}, "预览"))
			var $tab = VD.compile(e("span", {"class": "skill-name", "s-sign": "tab"}, "Tab"))
			var $whisper = VD.compile(e("span", {"class": "skill-name", "s-sign": "whisper"}, "私信"))

			var $skill_component = VD.compile(
				e("div", {"class": "skill-component"}, [
					e("ul", {"class": "skill-list"}, [
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "新建")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "编辑")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //历史
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //代码
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")//操作
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "注解")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "事件")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "动画")
						])
					]),
					e("ul", {"class": "skill-list"}, [
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "当前")
						]),
						e("li",  {"class": "skill-item"}, [

						]),
						e("li",  {"class": "skill-item"}, [
							$tab
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "网格")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") // 计划
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //地图
						]),
						e("li",  {"class": "skill-item"}, [
							$whisper
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "组") //IO
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "分支")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "载入")
						])
					]),
					e("ul", {"class": "skill-list"}, [
						e("li",  {"class": "skill-item"}, [
							$avatar
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //笔记
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //设置
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //搜索
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "") //地图
						]),
						e("li",  {"class": "skill-item"}, [
							e("span", {"class": "skill-name"}, "")
						])
					])
				])
			)

			this.$skill_layer = VD.compile(
				e("div", {"class": "skill-layer"}, [
					$skill_component
				])
			)

			SatoriEvent.activePrototpye({
				"$tab": $tab,
				"$preview": $preview,
				"$skill_component": $skill_component
			})

			return this.$skill_layer
		},

		/**
		 *  搜索
		 */
		 search_component: function () {
		 	var $search_result_list = VD.compile(e("ul", {"class": "search-result-list", "id": "search-result-list"}))
		 	SatoriEvent.search_result_list($search_result_list)

		 	return VD.compile(
		 		e("div", {"class": "search-component"}, [
		 			e("div", {"class": "top"}, [
		 				e("span", {"class": "search-keyword", "id": "search-keyword"})
		 			]),
		 			e("div", {"class": "bottom"}, [
		 				$search_result_list,
		 				e("div", {"class": "end"}, [
		 					e("div", {"class": "end-circle"}),
		 					e("span", {"class": "end-tip"}, "搜索完毕"),
		 				])
		 			])
		 		])
		 	)
		 },

		search_card_type_user: function (v_data) {
			return VD.compile(
				e("li", {"class": "search-result-item type-user"}, [
					e("div", {"class": "card-wrap"}, [
						e("div", {"class": "friend-invite", "button-type": "become_friends/" + v_data.userId}, "Friends"),
						e("div", {"class": "left"}, [
							e("div", {"class": "info-container"}, [
								e("span", {"class": "name"}, v_data.nickName),
								e("p", {"class": "info"}, v_data.info)
							]),
						]),
						e("div", {"class": "right"}, [
							e("img", {"src": "assets/images/" + v_data.avatar, "alt": v_data.name, "class": "avatar-5x"}),
						])
					])
				])
			)
		},

		search_card_type_project: function (v_data) {
			return VD.compile(
				e("li", {"class": "search-result-item type-project"}, [
					e("div", {"class": "left"}, [
						e("img", {"src": "assets/images/" + v_data.logo, "alt": v_data.name, "class": "avatar-5x"}),
					]),
					e("div", {"class": "right"}, [
						e("div", {"class": "info-container"}, [
							e("span", {"class": "name", "button-type": "project/" + v_data.projectId}, v_data.name),
							e("p", {"class": "info"}, v_data.info)
						]),
					])
				])
			)
		},

		comment_tip: function () {
			this.$comment_tip = VD.compile(e('span', {'class': 'comment-tip', 'id': 'comment-tip'}))
			return this.$comment_tip
		},


		satori_real_prototype: function (v_data) {
			console.info(v_data)
			return VD.compile(
				e(v_data.tagname, {'style': v_data.props, 'data-pid': v_data.prototypeId, 'data-comment': v_data.comment}, v_data.text)
			)
		}








	}

	window.Template = new Template()
})()

