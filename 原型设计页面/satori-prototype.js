;(function () {
	var EVENT_SIGN = 's-sign'

	var SatoriPrototype = function (v_selectors) {
		/**
		 * 初始化工具栏
		 */
		this.$tab = new SatoriTab()

		/**
		 * 原型选择列表
		 */
		this.select_list = []

		/**
		 * 原型容器
		 */
		this.$protoype_layer = v_selectors.$prototype_layer

		/**
		 * 所有原型工具栏
		 */
		this.$prototype_utils = v_selectors.$prototype_utils

		/**
		 * 鼠标当前状态
		 */
		this.cursor_event = null

		this.utils = {}

		/**
		 * 所有工具栏
		 */

		this.init()
	}

	SatoriPrototype.prototype = {
		constructor: SatoriPrototype,

		init: function () {
			var _this = this

			/**
			 * 获取点击对象
			 * 根据id，判断
			 */
			this.$prototype_utils.addEventListener('mousedown', function (event) {
				var $target = event.target
				var fn_name = $target.getAttribute(EVENT_SIGN)
				fn_name && _this.prototype_utils_fn[fn_name](event)
			})

			this.prototype_utils_fn = {
				'tab': function (event) {
					_this.$tab.view = !_this.$tab.view
				}
			}

			/**
			 * 绑定 mousedown事件，只分发事件
			 */
			this.$protoype_layer.addEventListener('mousedown', function (event) {
				this.cursor_event = 'mousedown'
			})
			/**
			 * 绑定 mousemove事件，只分发事件
			 */
			this.$protoype_layer.addEventListener('mousemove', function (event) {
				this.cursor_event = 'mousemove'
			})
			/**
			 * 绑定 mouseup事件，只分发事件
			 */
			this.$protoype_layer.addEventListener('mouseup', function (event) {
				this.cursor_event = 'mouseup'
			})

			this.mousedown_event = {

			}
			this.mousemove_event = {

			}
			this.mouseup_event = {

			}
		},






















	}

	window.SatoriPrototype = SatoriPrototype
})()










/**
 * Tab 工具栏
 */
;(function () {
	var SatoriTab = function () {
		this.$util_layer = document.getElementById('util-layer')
		this._view = false

		this.initHTML()
		this.mountHTML()
		this.init()
	}

	SatoriTab.prototype = {
		constructor: SatoriTab,

		mountHTML: function () {
			this.$util_layer.appendChild(this.$component)
		},

		initHTML: function () {
			var _this = this

			var data = SatoriRequest.data('tabList')
			var tab_items = []
			data.reduce(function (v_rope, v_tab_item) {
				var child = _this.tab_item_template(v_tab_item)
				tab_items.push(child)
			}, "")

			this.$slider = VD.compile(e('div', {'class': 'slider i-slider'}))
			this.$tab_list = VD.compile(e('ul', {'class': 'tab-list'}, tab_items))

			this.$inputer = VD.compile(e('input', {'type': 'text', 'class': 'satori-input'}))

			this.$enter_btn = VD.compile(e('li', {'class': 'satori-btn'}, '进入'))
			this.$create_btn = VD.compile(e('li', {'class': 'satori-btn'}, '创建'))
			this.$udpate_btn = VD.compile(e('li', {'class': 'satori-btn'}, '修改'))
			this.$remove_btn = VD.compile(e('li', {'class': 'satori-btn'}, '删除'))

			this.$component =  VD.compile(e('div', {'class': 'tab-component'}, [
				e('div', {'class': 'info'}, [
					e('span', {'class': 'title'}, [
						e('i', {'class': 'circle-5x i-circle-5x'}),
						e('span', '标签页')
					]),
				]),
				e('div', {'class': 'content'}, [
					this.$slider,
					this.$tab_list,
					this.$inputer
				]),
				e('ul', {'class': 'menu-list'}, [
					this.$enter_btn,
					this.$create_btn,
					this.$udpate_btn,
					this.$remove_btn
				])
			]))
		},

		tab_item_template: function (v_data) {
			return VD.compile(e('li', {'class': 'tab-item'}, [
				e('a', {'class': 'tab-item-link', 'href': v_data.tabId, 'data-tab_id': v_data.tabId}, v_data.name)
			]))
		},

		init: function () {
			var _this = this

			/**
			 * 通过 SatoriTab.view = true || false 控制tab的视图
			 */
			Object.defineProperty(_this, 'view', {
				set: function (v_new_view) {
					if (v_new_view) {
						_this.$component.style.display = 'block'
					} else {
						_this.$component.style.display = 'none'
					}
					_this._view = v_new_view
				},

				get: function () {
					return _this._view
				}
			})

			/**
			 * 选择标签页
			 */
			this.$tab_list.addEventListener('click', function (event) {
				var $target = event.target
				var count = parseInt(event.layerY / 25)
				_this.$slider.style.top = count * 25 + 'px'

				_this.select_tab_dom = $target.parentNode
				_this.select_tab_id = $target.dataset.tab_id

				event.preventDefault()
			})

			this.$enter_btn.addEventListener('click', function (event) {
				SatoriModal.pop('切换标签页 成功', SatoriModal.SUCCESS)
			})

			this.$create_btn.addEventListener('click', function (event) {
				_this.$inputer.setAttribute('placeholder', '创建新的tab')
				_this.$inputer.style.top = _this.$slider.style.top
				_this.$inputer.style.display = 'block'
				_this.$inputer.select()

				_this.current_state = 'create'

			})


			/**
			 * 1. 发送创建请求
			 * 2. 发送修改请求
			 */
			this.$inputer.addEventListener('blur', function (event) {
				_this.$inputer.style.display = 'none'
				_this.$inputer.value = ''

				/* 1 */
				if (_this.current_state === 'create') {
					/*发送请求成功后，在后台就即刻查询，然后返回查询成功后的tab，渲染到tab中，修改的话就直接发送 tab_id和改变后的名字回去 */
					var $new_tab_item = _this.tab_item_template({"tab_id": 5, "name": "春雨酱"})
					_this.$tab_list.appendChild($new_tab_item)

					_this.select_tab_dom = $new_tab_item.parentNode
					_this.select_tab_id = $new_tab_item.dataset.tab_id
					SatoriModal.pop('创建标签页 成功', SatoriModal.SUCCESS)
				/* 2 */
				} else if (_this.current_state === 'update') {

					SatoriModal.pop('修改标签页 成功', SatoriModal.SUCCESS)
				}
			})

			this.$udpate_btn.addEventListener('click', function (event) {
				_this.$inputer.value = _this.select_tab_dom.textContent
				_this.$inputer.style.top = _this.$slider.style.top
				_this.$inputer.style.display = 'block'
				_this.$inputer.select()

				_this.current_state = 'update'
				/**
				 * 发送更新请求
				 */
			})

			this.$remove_btn.addEventListener('click', function (event) {
				_this.$slider.style. top = 0
				_this.$tab_list.removeChild(_this.select_tab_dom)
				_this.select_tab_id = null
				/**
				 * 发送删除请求
				 */
				 SatoriModal.pop('删除标签页 成功', SatoriModal.SUCCESS)
			})
		},
	}

	window.SatoriTab = SatoriTab
})()




























/*;(function () {
	var oldY= null;
	var isdown = false;

	var $target = document.querySelector('.prototype')
	console.info('$target', $target)
	$target.addEventListener("mousedown", function (event) {
		isdown = true
		oldY = event.clientY
	})

	document.addEventListener("mousemove", function (event) {
		if (isdown) {
			$target.style.transform = "rotate(" + (event.clientY - oldY) + "deg)"
		}
	})

	document.addEventListener("mouseup", function (event) {
		isdown = false
		oldY = null
	})
})()*/

new SatoriPrototype({
	$prototype_layer: document.getElementById('prototype-layer'),
	$prototype_utils: document.getElementById('skill-component'),
})
