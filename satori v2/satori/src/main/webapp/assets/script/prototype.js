;(function () {
	var EVENT_SIGN = 's-sign'

	var SatoriPrototype = function (v_selectors) {
		/**
		 * 初始化工具栏
		 */
		this.$tab = new SatoriTab()
		// this.$create_menu = new SatoriCreateMenu()
		this.$whisper = new SatoriWhisper()

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
			console.info('初始化原型')
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
				},

				'create_menu': function () {
					_this.$create_menu.view = !_this.$create_menu.view
				},

				'whisper': function () {
					_this.$whisper.view = !_this.$whisper.view
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
		this.$util_layer = Template.layers.$util_layer

		this.initHTML()
		this.mountHTML()
		this.init()
		this._view = false
	}

	SatoriTab.prototype = {
		constructor: SatoriTab,

		initHTML: function () {
			this.$slider = VD.compile(e('div', {'class': 'slider i-slider'}))
			this.$tab_list = VD.compile(e('ul', {'class': 'tab-list'}))

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

		mountHTML: function () {
			this.$util_layer.appendChild(this.$component)
		},

		init: function (callback) {
			var _this = this

			/**
			 * 通过 SatoriTab.view = true || false 控制tab的视图
			 */
			Object.defineProperty(_this, 'view', {
				set: function (v_new_view) {
					if (v_new_view) {
						_this.$component.style.display = 'block'
						_this.refreshTabList()
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
				var inputer_value = _this.$inputer.value // 获得新建的tab 的名字
				_this.$inputer.style.display = 'none'
				_this.$inputer.value = ''

				/* 1 */
				if (_this.current_state === 'create') {
					/* 新的 tab 如果名字长度为0，就不用创建了 */
					if (inputer_value.length === 0) {
						SatoriModal.pop('取消了创建', SatoriModal.INFO)
						return
					}
					axios({
						'method': 'post',
						'url': '/satori/project/' + CURRENT_PROJECT_ID + '/createTab',
						'params': {
							'name': inputer_value
						}
					}).then(function (response) {
						console.info('response', response)
						var tab_id = response.data.data
						console.info('tab_id', tab_id)
						/*发送请求成功后，在后台就即刻查询，然后返回查询成功后的tab，渲染到tab中，修改的话就直接发送 tab_id和改变后的名字回去 */
						var $new_tab_item = _this.tab_item_template({"tabId": tab_id, "name": inputer_value})
						_this.$tab_list.appendChild($new_tab_item)

						_this.select_tab_dom = $new_tab_item.parentNode
						_this.select_tab_id = $new_tab_item.dataset.tab_id
						SatoriModal.pop('创建标签页 成功', SatoriModal.SUCCESS)
					}).catch(function (error) {
						console.log(error)
					})
				/* 2 */
				} else if (_this.current_state === 'update') {
					if (_this.value_before_update === inputer_value) {
						SatoriModal.pop('取消了更新', SatoriModal.INFO)
						return
					}
					axios({
						'method': 'post',
						'url': '/satori/project/' + CURRENT_PROJECT_ID + '/updateTabName',
						'params': {
							'tabId': _this.select_tab_id,
							'name': inputer_value
						}
					}).then(function (response) {
						console.info('response', response)
						_this.select_tab_dom.children[0].textContent = inputer_value
						SatoriModal.pop('修改标签页 成功', SatoriModal.SUCCESS)
					}).catch(function (error) {
						console.log(error)
					})
				}
			})

			this.$udpate_btn.addEventListener('click', function (event) {
				_this.$inputer.value = _this.select_tab_dom.textContent
				_this.$inputer.style.top = _this.$slider.style.top
				_this.$inputer.style.display = 'block'
				_this.$inputer.select()

				_this.value_before_update = _this.$inputer.value
				_this.current_state = 'update'
			})

			this.$remove_btn.addEventListener('click', function (event) {
				_this.$slider.style.top = 0
				axios({
					'method': 'post',
					'url': '/satori/project/' + CURRENT_PROJECT_ID + '/removeTab',
					'params': {
						'tabId': _this.select_tab_id
					}
				}).then(function (response) {
					_this.select_tab_id = null
					_this.$tab_list.removeChild(_this.select_tab_dom)
					SatoriModal.pop('删除标签页 成功', SatoriModal.SUCCESS)
				}).catch(function (error) {
					console.log(error)
				})

			})
		},

		tab_item_template: function (v_data) {
			return VD.compile(e('li', {'class': 'tab-item'}, [
				e('a', {'class': 'tab-item-link', 'href': v_data.tabId, 'data-tab_id': v_data.tabId}, v_data.name)
			]))
		},

		/**
		 * 获取 tab 列表
		 */
		refreshTabList: function () {
			var _this = this
			axios({
				"method": "post",
				"url": "/satori/project/" + CURRENT_PROJECT_ID + "/getTabList",
			}).then(function (response) {
				var data = response.data.data
				if (data == null) {
					_this.$tab_list.innerHTML = ''
					return
				}
				var $fragment = document.createDocumentFragment()
				data.reduce(function (v_rope, v_tab_item) {
					var child = _this.tab_item_template(v_tab_item)
					$fragment.appendChild(child)
				}, "")
				_this.$tab_list.innerHTML = ''
				_this.$tab_list.appendChild($fragment)
			}).catch(function (error) {
				console.log(error)
			})
		}
	}

	window.SatoriTab = SatoriTab
})()

/**
 * 私信
 */
;(function () {
 	var SatoriWhisper = function () {
 		this.$util_layer = Template.layers.$util_layer

 		this.initHTML()
 		this.mountHTML()
 		this.init()
 		this._view = false
 	}

 	SatoriWhisper.prototype = {
 		constructor: SatoriWhisper,

 		initHTML: function () {

 		},

 		mountHTML: function () {
 			this.$util_layer.appendChild(this.$component)
 		},

 		init: function () {

 		},
 	}

 	window.SatoriWhisper = SatoriWhisper
})()










// /**
//  * 新建栏
//  */
// ;(function () {
// 	var SatoriCreateMenu = function (v_menu) {
// 		this.menu = v_menu

// 		this.view = false
// 		this.initHTML()
// 		this.mountHTML()
// 		this.init()
// 	}

// 	SatoriCreateMenu.prototype = {
// 		constructor: SatoriCreateMenu,

// 		initHTML: function () {
// 			this.$component =  VD.compile(e('div', {'class': 'create-component'}, [
// 				e('div', {'class': 'info'}, [
// 					e('span', {'class': 'title'}, [
// 						e('i', {'class': 'circle-5x i-circle-5x'}),
// 						e('span', '标签页')
// 					]),
// 				]),
// 				e('div', {'class': 'create-menu-container'}, [
// 					e('span', {'create-menu-title'}, '形状'),
// 					e('ul', {'class': 'create-menu-list'})
// 				]),
// 				e('div', {'class': 'create-menu-container'}, [
// 					e('span', {'create-menu-title'}, '文字'),
// 					e('ul', {'class': 'create-menu-list'})
// 				]),
// 			]))
// 		},

// 		mountHTML: function () {

// 		},

// 		init: function () {
// 			var _this = this

// 			/**
// 			 * 通过 SatoriTab.view = true || false 控制tab的视图
// 			 */
// 			Object.defineProperty(_this, 'view', {
// 				set: function (v_new_view) {
// 					if (v_new_view) {
// 						_this.$component.style.display = 'block'
// 						_this.refreshCreateMenu()
// 					} else {
// 						_this.$component.style.display = 'none'
// 					}
// 					_this._view = v_new_view
// 				},

// 				get: function () {
// 					return _this._view
// 				}
// 			})
// 		},

// 		refreshCreateMenu: function () {

// 		}
// 	}

// 	window.SatoriCreateMenu = SatoriCreateMenu
// })({
// 	'形状': {
// 		'矩形': {'tagname': 'div', 'props': 'width:100px;height:100px;'},
// 		'圆形': {'tagname': 'div', 'props': 'width:100px;height:100px;'},
// 	}
// })


