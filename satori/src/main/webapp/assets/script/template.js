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
			 * 所有图层
			 */
			this.layers = {
				$loading_layer: VD.compile(e('div', {'class': 'loading-layer'})),
				$branch_layer: VD.compile(e('div', {'class': 'branch-layer'})),
				$main_layer: VD.compile(e('div', {'class': 'main-layer'})),
				$effect_layer: VD.compile(e('div', {'class': 'effect-layer'})),
				$prototype_layer: VD.compile(e('div', {'class': 'prototype-layer'})),
				$chat_layer: VD.compile(e('div', {'class': 'chat-layer'})),
				$util_layer: VD.compile(e('div', {'class': 'util-layer'})),
				$skill_layer: VD.compile(e('div', {'class': 'skill-layer'}))
			}
		},

		/**
		 * 顶部技能栏
		 */
		skill_top: function () {
			var $index = VD.compile(e("li", {"class": "skill-item"}, "主页"))
			var $map = VD.compile(e("li", {"class": "skill-item"}, "地图"))
			var $search = VD.compile(e("li", {"class": "skill-item"}, "搜索"))
			var $project = VD.compile(e("li", {"class": "skill-item"}, "项目"))
			var $store = VD.compile(e("li", {"class": "skill-item"}, "仓库"))
			var $note = VD.compile(e("li", {"class": "skill-item"}, "笔记"))
			var $denpa = VD.compile(e("li", {"class": "skill-item"}, "电波"))
			var $home = VD.compile(e("li", {"class": "skill-item"}, "HOME"))

			SatoriEvent.skill_top_index($index)
			SatoriEvent.skill_top_map($map)
			SatoriEvent.skill_top_search($search)
			SatoriEvent.skill_top_project($project)
			SatoriEvent.skill_top_store($store)
			SatoriEvent.skill_top_note($note)
			SatoriEvent.skill_top_denpa($denpa)
			SatoriEvent.skill_top_home($home)

			return VD.compile(
				e("div", {"class": "skill-component"}, [
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
							$denpa,
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
			var $card_list = VD.compile(e("ul", {"class": "card-list"}))

			var $trend = VD.compile(e("a", {"class": "item-name"}, "动态"))
			var $project = VD.compile(e("a", {"class": "item-name"}, "项目"))
			var $note = VD.compile(e("a", {"class": "item-name", "href": ""}, "笔记"))
			var $denpa = VD.compile(e("a", {"class": "item-name", "href": ""}, "电波"))
			var $store = VD.compile(e("a", {"class": "item-name", "href": ""}, "仓库"))
			var $setting = VD.compile(e("a", {"class": "item-name", "href": ""}, "设置"))

			SatoriEvent.home_trend($trend)
			SatoriEvent.home_project($project)
			SatoriEvent.home_note($note)
			SatoriEvent.home_denpa($denpa)
			SatoriEvent.home_store($store)
			SatoriEvent.home_setting($setting)

			return VD.compile(
				e("div", {"class": "home-component"}, [
					e("div", {"class": "impression-component"}, [
						e("div", {"class": "impression-container"}, [
							e("img", {"src": "assets/images/he_img.jpg", "class": "impression-5x"})
						]),
					]),
					e("div", {"class": "statistics-component"}, [
						e("div", {"class": "user-avatar-container"}, [
							e("img", {"src": "assets/images/harusame.png", "class": "user-avatar-5x"}),
						]),
						e("div", {"class": "statistics-container"}, [
							e("ul", {"class": "statistics-list"}, [
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}),
									$trend
								]),
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}, "0"),
									$project
								]),
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}, "0"),
									$note
								]),
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}, "0"),
									$denpa
								]),
								e("li", {"class": "statistics-item"}, [
									e("span", {"class": "statistics-count"}, "0"),
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
								e("div", {"class": "center"}, [
									e("div", {"class": "state-component"}, [
										e("div", {"class": "state-no-card"}, [
											e("span", {"class": "state-illustate"}, "还没有动态哦"),
										]),
									]),
									$card_list
								])
							]),
							e("div", {"class": "left"}, [
								e("div", {"class": "info-container"}, [
									e("h1", {"class": "user-name"}, "时津风"),
									e("h2", {"class": "user-state"}),
									e("p", {"class": "user-introduce"}, "阳炎型十号舰的时津风哟。和雪风、初风、天津风编成了第十六驱逐队，我们可是很努力了呢！也加入过二水战哦，真的真的。但是，没有制海权的海域…稍微有点不太喜欢呢…")
								]),
							]),
							e("div", {"class": "right"}, "")
						])
					])
				])
			)
		},

		/**
		 * 注册页面
		 */
		signup: function () {
			return VD.compile(
				e("div", {"class": "signup-component"}, [
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
										e("input", {"type": "text", "class": "r-input i-r-input", "placeholder": "登陆用的用户名，不是昵称哦"}),
										e("span", {"class": "r-result-error i-r-result"}, "该用户名已经被占用啦"),
										e("span", {"class": "r-result-error i-r-result"}, "用户名不符合规范"),
										e("span", {"class": "r-result-success i-r-result"}, "是新朋友哦"),
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
										e("input", {"type": "text", "class": "r-input i-r-input", "placeholder": "登陆用的验证密码"}),
										e("span", {"class": "r-result-error i-r-result"}, "该用户名已经被占用啦"),
										e("span", {"class": "r-result-error i-r-result"}, "用户名不符合规范"),
										e("span", {"class": "r-result-success i-r-result"}, "是新朋友哦"),
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
										e("input", {"type": "text", "class": "r-input i-r-input", "placeholder": "保证跟上面一样"}),
										e("span", {"class": "r-result-error i-r-result"}, "密码不一致哦"),
										e("span", {"class": "r-result-success i-r-result"}, "一致的密码"),
										e("ul", {"class": "condition-list"}, [
											e("li", {"class": "condition-item"}, "与密码相同")
										])
									])
								])
							])
						]),
						e("li", {"class": "operation-container"}, [
							e("div", {"class": "next r-submit i-r-submit"}, "提交"),
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
							e("span", {"class": "title"}, v_data.title),
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
		type_denpa: function (v_data) {
			return VD.compile(
				e("li", {"class": "card-item type-denpa"}, [
					e("div", {"class": "left"}, [
						e("div", {"class": "card-avatar-container"}, [
							e("img", {"src": "assets/images/poi.png", "alt": v_data.title, "class": "card-avatar-5x"})
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
			return $card_list
		},
	}

	window.Template = new Template()
})()

