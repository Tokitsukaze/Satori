;(function (v_stage) {
	var STAGE = v_stage
	/**
	 * 登陆验证
	 */
	function isLogin () {
		if (SESSION_userId.length === 0) {
			return false
		} else {
			return true
		}
	}

	var View = function () {
		this.stage
		this.exist_components_name = []
		this.exist_components = []
		this.exist_all_compoents = {} /* 所有已经渲染过的模板 */

		this.init()

		this.updateStage(SITE_SUFFIX)
		// this.switchStageToIndex()
	}

	View.prototype = {
		constructor: View,

		/**
		 * 视图初始化，首屏渲染
		 * 1. 将 主图层 渲染到首屏
		 */
		init: function () {
			this.$main_layer = Template.layers.$main_layer
			this.$satori = Template.$satori;

			this.$satori.appendChild(this.$main_layer)
		},

		/**
		 * 更新舞台视图
		 * 1. 获得新视图所需要的组件
		 * 2. 检查 该组件 是否 存在 当前组件 中
		 * 3. 如果不存在
		 * 4. 渲染所需要的组件的模板，如果已经渲染过，那么使用渲染过的模板
		 * 5. 将该位置的DOM替换成 模板
		 * 6. 更新当前组件状态
		 * 7. 删除多出来的组件
		 */
		updateStage: function (v_new_stage, v_callback) {
			if (this.stage === v_new_stage) {
				console.info('WARNING 相同的视图')
				return
			}

			this.stage = v_new_stage

			var $fragment = document.createDocumentFragment()
			/* 1  */
			var components_required = STAGE[v_new_stage]
			if (components_required == null) {
				this.updateStage("index")
				return
			}
			/* 2 */
			var components_required_length = components_required.length

			for (var i = 0; i < components_required_length; i++) {
				var component_need_name = components_required[i]

				/* 3 */
				if (this.exist_components_name[i] !== component_need_name) {
					/* 对顶部技能栏需要额外处理 */
					if (component_need_name === "skill_top") {
						/* 如果已经登陆了 */
						if (isLogin()) {
							component_need_name = "skill_top_true"
						} else {
							component_need_name = "skill_top_false"
						}
					}

					console.info("component_need_name", component_need_name)
					/* 4 */
					var component_need = this.exist_all_compoents[component_need_name] || Template[component_need_name]()
					var component_exist = this.exist_components[i]

					/* 如果这个位置没有节点 就appendChild，否则替换 */
					/* 5 */
					if (component_exist == null) {
						this.$main_layer.appendChild(component_need)
					} else {
						this.$main_layer.replaceChild(component_need, component_exist)
					}

					/* 6 */
					this.exist_components_name[i] = component_need_name
					this.exist_components[i] = component_need
					this.exist_all_compoents[component_need_name] = component_need
				}
			}

			/* 7 */
			var exist_components_name_length = this.exist_components_name.length
			if (exist_components_name_length > components_required_length) {
				for (var i = components_required_length; i < exist_components_name_length; i++) {
					this.$main_layer.removeChild(this.exist_components[i])
				}
			}

			this.exist_components_name.length = components_required_length
			this.exist_components.length = components_required_length

			history.pushState(v_new_stage, "", v_new_stage)
		},

		/**
		 * 更新 home 里的二级菜单
		 */
		updateViewHome: function (v_new_route, v_$center, v_$card_list) {
			var $center = v_$center
			var $card_list = v_$card_list
			switch (v_new_route) {
				case "trend":
					axios.post('/satori/home/' + SESSION_userId + '/trend')
					.then(function (response) {
						var data = response.data
						if (response.status === 200) {
							$center.innerHTML = ""
							$center.appendChild(Template["home_card_list"](data["data"]))
						} else {
							$center.appendChild(Template["home_card_tip"]("动态"))
						}
					}).catch(function (error) {
						console.log(error);
					})
					break
				case "project":
					axios.post('/satori/project/' + SESSION_userId + '/getProjectList')
					.then(function (response) {
						var data = response.data
						if (response.status === 200) {
							if (data)
							console.info(response)
							$center.innerHTML = ""
							$center.appendChild(Template["home_card_list"](data["data"]))
							$center.appendChild(Template["home_card_tip"]("项目"))
						} else {
							console.log(error);
							console.log(response)
						}
					}).catch(function (error) {
						console.log(error);
					})
					break
				case "note":

					break
				case "denpa":

					break
				case "store":

					break
				case "setting":
					axios({
						"method": "post",
						"url": "/satori/home/" + SESSION_userId + "/getUser",
					})
					.then(function (response) {
						var data = response.data
						if (response.status === 200) {
							console.info(response)
							$center.innerHTML = ""
							$center.appendChild(Template["home_setting"](data["data"]))
						} else {
							console.log(response)
						}
					}).catch(function (error) {
						console.log(error);
					})
					break
			}
		},









		/**
		 * home/trend
		 */
		switchStageToIndex: function () {
			var _this = this
			axios.post('/satori/home/10001/trend')
			.then(function (response) {
				var data = response.data
				var $fragment = document.createDocumentFragment()
				$fragment.appendChild(Template.skill_top())
				$fragment.appendChild(Template.home(data["data"]))
				_this.$main_layer.innerHTML = ""
				_this.$main_layer.appendChild($fragment)
			}).catch(function (error) {
				console.log(error);
			})
		},

		/**
		 * home/project
		 */
		switchStageToProject: function () {
			var _this = this
			axios.post('/satori/home/10001/project')
			.then(function (response) {
				var data = response.data
				var $fragment = document.createDocumentFragment()
				$fragment.appendChild(Template.skill_top())
				$fragment.appendChild(Template.home(data["data"]))
				_this.$main_layer.innerHTML = ""
				_this.$main_layer.appendChild($fragment)
			}).catch(function (error) {
				console.log(error);
			})
		},

		/**
		 *
		 */
		getDOM: function (v_template) {

		}
	}

	window.View =  new View()
})({
	"index": [
		"skill_top"
	],
	"signup": [
		"skill_top",
		"signup"
	],
	"signin": [
		"skill_top",
		"signin"
	],
	"home": [
		"skill_top",
		"home"
	]
})

