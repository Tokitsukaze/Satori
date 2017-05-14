;(function (v_stage) {
	var STAGE = v_stage

	var View = function () {
		this.stage
		this.exist_components_name = []
		this.exist_components = []
		this.exist_all_compoents = {} /* 所有已经渲染过的模板 */

		this.init()

		this.updateStage("index")
		// this.switchStageToIndex()
	};

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
		 * 4. 渲染所需要的组件的模板
		 * 5. 将该位置的DOM替换成 模板
		 * 6. 更新当前组件状态
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
			/* 2 */
			var components_required_length = components_required.length

			for (var i = 0; i < components_required_length; i++) {
				var component_need_name = components_required[i]

				/* 3 */
				if (this.exist_components_name[i] !== component_need_name) {
					var component_need = Template[component_need_name]()
					var component_exist = this.exist_components[i]
					/* 如果这个位置没有节点 就appendChild，否则替换 */
					if (component_exist == null) {
						console.info('INFO 追加')
						this.$main_layer.appendChild(component_need)
					} else {
						console.info('INFO 替换')
						this.$main_layer.replaceChild(component_need, component_exist)
					}

					this.exist_components_name[i] = component_need_name
					this.exist_components[i] = component_need
				}
			}

			/* 删除多出来的组件 */
			var exist_components_name_length = this.exist_components_name.length
			if (exist_components_name_length > components_required_length) {
				for (var i = components_required_length; i < exist_components_name_length; i++) {
					this.$main_layer.removeChild(this.exist_components[i])
				}
			}

			this.exist_components_name.length = components_required_length
			this.exist_components.length = components_required_length

			v_callback && v_callback()
		},

		/**
		 * 更新 home 里的二级菜单
		 */
		updateHome: function (v_new_route) {
			switch (v_new_route) {
				case "trend":

					break
				case "project":

					break
				case "note":

					break
				case "denpa":

					break
				case "store":

					break
				case "setting":

					break
			}
		}









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

