;(function () {
	var EVENT_SIGN = 's-sign'

	var SatoriPrototype = function (v_selectors) {
		/**
		 * 初始化工具栏
		 */
		this.$tab = new SatoriTab()
		// this.$create_menu = new SatoriCreateMenu()
		this.$whisper = new SatoriWhisper()
		this.$preview = new SatoriPreview()

		/**
		 * 接收键盘事件
		 */
		this.$keyborad_inputer = Template.$keyborad_inputer

		/**
		 * 原型容器
		 */
		this.$prototype_layer = Template.$prototype_component

		/**
		 * 所有原型工具栏
		 */
		this.$prototype_utils = v_selectors.$prototype_utils

		/**
		 * 鼠标当前状态
		 */
		this.cursor_event = null
		/**
		 * 按下的键
		 */
		this.keydown_list = {}

		/**
		 * 所有工具栏
		 */
		this.utils = {}

		this.ACTION = {
			"CREATE": "CREATE",
			"MOVE": "MOVE"
		}

		/**
		 * 原型选择列表
		 */
		this.$select_list = []

		/**
		 * 前进与后退记录器
		 */
		this.back_list = []
		this.front_list = []

		/**
		 *  原型id 记录器
		 */
		this._prototype_id = 0

		/**
		 * 原型画笔初始化
		 */
		this.paint_flag = false
		this.select_list_pid = {}

		this.init()
	}

	SatoriPrototype.prototype = {
		constructor: SatoriPrototype,

		init: function () {
			var _this = this

			Object.defineProperty(this, 'prototype_id', {
				set: function (v_new_id) {
					_this._prototype_id = v_new_id
				},
				get: function () {
					_this._prototype_id++
					return _this._prototype_id
				}
			})

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
				},

				'preview': function () {
					_this.$preview.view = !_this.$preview.view
				}
			}

			/**
			 * 1. 原型选择
			 * 2. 原型画笔
			 * 3. 原型移动
			 */


			/**
			 * 绑定 mousedown事件，只分发事件
			 */
			this.$prototype_layer.addEventListener('mousedown', function (event) {
				_this.$keyborad_inputer.focus()
				var fn = _this.mousedown_event[_this.cursor_event]
				fn && fn(_this, event)
			})
			/**
			 * 绑定 mousemove事件，只分发事件
			 */
			this.$prototype_layer.addEventListener('mousemove', function (event) {
				// 注释检测
				var $target = event.target
				var comment = $target.dataset.comment
				if (comment != null) {
					Template.$comment_tip.style.display = 'block'
					setTimeout(function () {
						Template.$comment_tip.style.opacity = 1
					}, 250)
					Template.$comment_tip.textContent = comment
				} else {
					Template.$comment_tip.style.display = 'block'
					setTimeout(function () {
						Template.$comment_tip.style.opacity = 0
					}, 250)
				}
				var fn = _this.mousemove_event[_this.cursor_event]
				fn && fn(_this, event)
			})
			/**
			 * 绑定 mouseup事件，只分发事件
			 */
			this.$prototype_layer.addEventListener('mouseup', function (event) {
				_this.$keyborad_inputer.focus()
				var fn = _this.mouseup_event[_this.cursor_event]
				fn && fn(_this, event)
			})

			this.mousedown_event = {
				// 原型选择
				'1': function (_this, event) {

				},
				// 原型画笔
				'2': function (_this, event) {
					// 画笔是否完成开关
					_this.paint_flag = true
					var $paint_node = VD.compile(e('div', {'data-pid': _this.prototype_id}))
					_this.$paint_node = $paint_node
					_this.$prototype_layer.appendChild(_this.$paint_node)

					_this.paint_start_y = event.pageY
					_this.paint_start_x = event.pageX

					_this.$paint_node.style.top = _this.paint_start_y + 'px'
					_this.$paint_node.style.left = _this.paint_start_x + 'px'
				},
				// 原型移动
				'3': function (_this, event) {
					_this.move_flag = true

					// 如果没有选中，那么就弹窗
					if (_this.$select_list.length === 0) {
						SatoriModal.pop('请先选择原型节点', SatoriModal.ERROR)
						return
					}

					_this.move_start_position = []
					_this.$select_list.reduce(function (v_rope, v_prototype) {
						_this.move_start_position.push({
							start_y: parseInt(v_prototype.style.top),
							start_x: parseInt(v_prototype.style.left)
						})
					}, "")

					_this.move_start_y = event.pageY
					_this.move_start_x = event.pageX
				}
			}

			this.mousemove_event = {
				// 原型选择
				'1': function (_this, event) {

				},
				// 原型画笔
				'2': function (_this, event) {
					if (!_this.paint_flag) {
						return
					}
					var current_y = event.pageY
					var current_x = event.pageX
					// 往右边
					if (current_x > _this.paint_start_x) {
						// 往下边
						if (current_y > _this.paint_start_y) {
							_this.$paint_node.style.width = current_x - _this.paint_start_x + 'px'
							_this.$paint_node.style.height = current_y -  _this.paint_start_y + 'px'
						// 往上边
						} else {
							_this.$paint_node.style.width = current_x - _this.paint_start_x + 'px'
							_this.$paint_node.style.top = current_y + 'px'
							_this.$paint_node.style.height = _this.paint_start_y - current_y + 'px'
						}
					// 往左边
					} else {
						// 往下边
						if (current_y > _this.paint_start_y) {
							_this.$paint_node.style.width = _this.paint_start_x - current_x + 'px'
							_this.$paint_node.style.left = current_x + 'px'
							_this.$paint_node.style.height = current_y -  _this.paint_start_y + 'px'
						// 往上边
						} else {
							_this.$paint_node.style.width = _this.paint_start_x - current_x + 'px'
							_this.$paint_node.style.left = current_x + 'px'
							_this.$paint_node.style.height = _this.paint_start_y - current_y + 'px'
							_this.$paint_node.style.top = current_y + 'px'
						}
					}
				},
				// 原型移动
				'3': function (_this, event) {
					if (!_this.move_flag) {
						return
					}
					var move_distance_y = event.pageY - _this.move_start_y
					var move_distance_x = event.pageX - _this.move_start_x

					for (var i = 0; i < _this.$select_list.length; i++) {
						var current_prototype = _this.$select_list[i]
						var start_position = _this.move_start_position[i]

						var minus_y = move_distance_y + start_position.start_y
						var minus_x = move_distance_x + start_position.start_x
						current_prototype.style.top = minus_y + 'px'
						current_prototype.style.left = minus_x + 'px'
					}
				}
			}

			this.mouseup_event = {
				// 原型选择
				'1': function (_this, event) {
					var $target = event.target
					var pid = $target.dataset.pid
					if (pid == null) {
						// 清除选择效果
						_this.$select_list.reduce(function (v_rope, v_prototype) {
							v_prototype.className = ''
						}, "")
						_this.$select_list.length = 0
						_this.select_list_pid = {}
						return
					}
					// 多选
					if (_this.keydown_list['Control']) {
						if (_this.select_list_pid[pid]) {
							SatoriModal.pop('已选择该元素', SatoriModal.ERROR)
							return
						}
						_this.$select_list.reduce(function (v_rope, v_prototype) {
							v_prototype.className = 'selected'
						}, "")
						_this.select_list_pid[pid] = true
						_this.$select_list.push(event.target)
						return
					}
					// 单选
					if (_this.select_list_pid[pid]) {
						SatoriModal.pop('已选择该元素', SatoriModal.ERROR)
						return
					}
					event.target.className = 'selected'
					_this.select_list_pid[pid] = true
					_this.$select_list.length = 0
					_this.$select_list.push(event.target)
				},
				// 原型画笔
				'2': function (_this, event) {
					// 如果这个原型够小，且没有移动
					var final_width = _this.$paint_node.style.width
					var final_height = _this.$paint_node.style.height

					if (final_width < 6 && final_height < 6) {
						_this.$prototype_layer.removeChild(_this.$paint_node)
						_this.paint_flag = false
						SatoriModal.pop('由于原型过小 自动删除', SatoriModal.ERROR)
						return
					}

					_this.paint_flag = false
					_this.ExecuteOperation(_this.ACTION.CREATE, {'$el': _this.$paint_node})
				},
				// 原型移动
				'3': function (_this, event) {
					_this.move_flag = false
					_this.ExecuteOperation(_this.ACTION.MOVE, {'$el': _this.$paint_node})
				}
			}






			/**
			 * 1. 判断当前按下的键位，key 与 keyCode，keyCode不区分大小写，这点用来做大小写无关组合键的功能处理
			 * 2. 匹配已有的自定义键
			 * 3. 如果有则执行
			 */
			this.$keyborad_inputer.addEventListener('keydown', function (event) {
				console.info(event)
				var key = event.key /* 1 */
				var keyCode = event.keyCode /* 1 */

				_this.keydown_list[key] = true

				var fn = _this.keydown_event[key] /* 2 */
				if (fn) { /* 3 */
					fn(_this, event)
					return
				}

				fn = _this.keydown_event[keyCode] /* 1 */ /* 2 */
				if (fn) { /* 3  */
					fn(_this, event)
					return
				}
			})

			this.keydown_event = {

			}

			/**
			 * 原理与 keydown 相同
			 */
			this.$keyborad_inputer.addEventListener('keyup', function (event) {
				var key = event.key
				var keyCode = event.keyCode

				_this.keydown_list[key] = false

				var fn = _this.keyup_event[key]
				if (fn) {
					fn(_this, event)
					return
				}

				fn = _this.keyup_event[keyCode] /* 1 */ /* 2 */
				if (fn) { /* 3  */
					fn(_this, event)
					return
				}
			})

			this.keyup_event = {
				// 切换模式为原型选择模式
				'1': function (_this, event) {
					// 如果当前在 Ctrl 状态下
					// 查看原型池
					if (_this.keydown_list['Control']) {
						var len = _this.$select_list.length
						if (len < 1) {
							SatoriModal.pop('当前没有选择原型', SatoriModal.INFO)
							return
						} else {
							SatoriModal.pop('原型选择数量: ' + len, SatoriModal.INFO)
						}
						return
					}

					_this.cursor_event = '1'
					SatoriModal.pop('原型选择 模式', SatoriModal.INFO, 2000)
				},
				// 切换模式为画笔模式
				'2': function (_this, event) {
					_this.cursor_event = '2'
					SatoriModal.pop('原型画笔 模式', SatoriModal.INFO, 2000)
				},
				// 切换为原型移动模式
				'3': function (_this, event) {
					_this.cursor_event = '3'
					SatoriModal.pop('原型移动 模式', SatoriModal.INFO, 2000)
				},
				'Delete': function (_this, event) {
					var len = _this.$select_list.length
					if (len === 0) {
						SatoriModal.pop('当前没有选择原型', SatoriModal.ERROR, 2000)
						return
					}
					SatoriModal.pop('删除中...', SatoriModal.INFO, 1000)
					_this.$select_list.reduce(function (v_rope, v_prototype) {
						_this.$prototype_layer.removeChild(v_prototype)
					}, "")
					_this.$select_list.length = 0
					_this.select_list_pid = {}
					SatoriModal.pop('删除了 ' + len + ' 个原型', SatoriModal.SUCCESS, 2000)
				},

				// Ctrl + s/S(83) 保存
 				'83': function (_this, event) {
 					event.preventDefault() // 防止默认的保存网页
 					if (_this.keydown_list['Shift']) {
 						var $all_prototype = Array.prototype.slice.call(_this.$prototype_layer.children, 0)
 						console.info($all_prototype)

 						var prototypeModel = DOMToVD($all_prototype)
 						axios({
 							'method': 'post',
 							'url': '/satori/tab/' + CURRENT_TAB_ID + '/branch/' + CURRENT_BRANCH_ID + '/save',
 							'params': {
 								'prototypeModel': prototypeModel
 							}
 						}).then(function (response) {
 							console.info(response)
							SatoriModal.pop('保存成功', SatoriModal.SUCCESS, 5000)
 						}).catch(function (error) {
 							SatoriModal.pop('保存失败 网络通信异常', SatoriModal.ERROR, 5000)
 							console.log(error)
 						})
 					}

 					function DOMToVD (v_$dom_list) {
 						var update_date = +new Date()
 						var prototype_list = []
 						v_$dom_list.forEach(function (item) {
 							prototype_list.push(_DOMToVD(item, update_date))
 						})
 						return prototype_list
 					}

 					function _DOMToVD (v_$dom, v_update_date) {
 						var props = v_$dom.getAttribute('style').replace(/\s/g, '')
 						return {
 							prototypeId: parseInt(v_$dom.dataset.pid),
 							tabId: parseInt(CURRENT_TAB_ID),
 							tagname: v_$dom.tagName.toLowerCase(),
 							props: props,
 							text: "",
 							updateDate: v_update_date
 						}
 					}
				},

				'Escape': function (_this, event) {
					_this.$preview.view = !_this.$preview.view
				}
			}
		},

		/**
		 * 所有动作的执行器
		 */
		ExecuteOperation: function (v_type, v_data) {
			var _this = this
			switch (v_type) {
				case _this.ACTION.CREATE:
					_this.back_list.push(_this.ACTION.CREATE, v_data.$el)
					SatoriModal.pop('执行本地存储', SatoriModal.INFO)
					SatoriModal.pop('存储撤回队列', SatoriModal.INFO)
					break
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
				_this.select_tab_branch = $target.dataset.branch

				event.preventDefault()
			})

			this.$enter_btn.addEventListener('click', function (event) {
				if (_this.select_tab_id == null) {
					SatoriModal.pop('请先选择一个 Tab 哦', SatoriModal.ERROR, 1500)
					return
				}
				CURRENT_TAB_ID = _this.select_tab_id
				CURRENT_BRANCH_ID = _this.select_tab_branch
				console.info('CURRENT_TAB_ID', CURRENT_TAB_ID)
				axios({
					'method': 'post',
					'url': '/satori/tab/' + CURRENT_TAB_ID + '/getDefaultBranchTabPrototype'
				}).then(function (response) {
					SatoriModal.pop('切换标签页 成功', SatoriModal.SUCCESS)
					// 清除画布
					Template.$prototype_component.innerHTML = ''
					// 渲染原型
					SatoriModal.pop('渲染中', SatoriModal.INFO)
					var data = response.data
					var prototype_list = data['data']

					var $fragment = document.createDocumentFragment()

					/**
					 * 渲染的同时获取最大 pid
					 */
					var max_pid = prototype_list.reduce(function (v_max_pid, v_prototype) {
						var current_pid = v_prototype.prototypeId
						$fragment.appendChild(Template['satori_real_prototype'](v_prototype))
						return v_max_pid = current_pid > v_max_pid ? current_pid : v_max_pid
					}, -1)
					Template.$prototype_component.appendChild($fragment)

					var temp_len = prototype_list.length
					if  (temp_len === 0) {
						SatoriModal.pop('渲染成功 不过该 Tab 没有原型', SatoriModal.SUCCESS)
					} else {
						SatoriModal.pop('渲染成功' + temp_len + ' 个原型' , SatoriModal.SUCCESS)
					}

					if (Harusame != null) {
						Harusame.prototype_id = max_pid
					}
				}).catch(function (error) {
					console.log(error)
				})
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
				e('a', {'class': 'tab-item-link', 'href': v_data.tabId, 'data-tab_id': v_data.tabId, 'data-branch': v_data.branch}, v_data.name)
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
 * 私信框
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
 			this.$friends_list = VD.compile(e("ul", {"class": "friends-list"}))
 			this.$message_content = VD.compile(e("div", {"class": "message-content"}))
 			this.$chatter = VD.compile(e("textarea", {"class": "inputer-container", "placeholder": "在这里输入~"}))

 			this.$friend_avatar = VD.compile(e("img", {"src": "assets/images/default-avatar.jpg", "class": "friends-avatar-5x"}))
 			this.$friend_name = VD.compile(e("h2", {"class": "friends-name"}))
 			this.$friend_intro = VD.compile(e("h3", {"class": "friends-intro"}))

 			this.$component = VD.compile(
 				e("div", {"class": "whisper-component-full"}, [
 					e("div", {"class": "left"}, [
 						this.$friends_list
 					]),
 					e("div", {"class": "right"}, [
 						e("div", {"class": "top"}, [
 							e("div", {"class": "friends-info"}, [
 								e("div", {"class": "left"}, [
 									e("div", {"class": "friends-avatar-container"}, [
 										this.$friend_avatar
 									])
 								]),
 								e("div", {"class": "right"}, [
 									this.$friend_name,
 									this.$friend_intro
 								])
 							])
 						]),
 						e("div", {"class": "body"}, [
 							e("div", {"class": "chat-container"}, [
 								this.$message_content
 							])
 						]),
 						e("div", {"class": "chater-container"}, [
 							e("div", {"class": "top"}, [
 								e("div", {"class": "option-container"}, [
 									e("ul", {"class": "option-list"}, [
 										e("li", {"class": "option-item"}, "字体"),
 										e("li", {"class": "option-item"}, "表情"),
 										e("li", {"class": "option-item"}, "图片")
 									]),
 									e("ul", {"class": "operation-list"}, [
 										e("li", {"class": "operation-item"}, "关闭"),
 										e("li", {"class": "operation-item"}, "记录"),
 										e("li", {"class": "operation-item"}, "发送")
 									]),
 									this.$chatter
 								])
 							])
 						])
 					])
 				])
 			)
 		},

 		mountHTML: function () {

 			this.$util_layer.appendChild(this.$component)

 			// this.scroller = new SatoriScroller({'content': this.$message_content})
 		},

 		init: function () {
 			var _this = this

 			Object.defineProperty(_this, 'view', {
 				set: function (v_new_view) {
 					if (v_new_view) {
 						_this.$component.style.display = 'block'
 						_this.getFriendList()
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
 			 * 设置与当前好友的私信框
 			 */
 			this.$friends_list.addEventListener('click', function (event) {
 				var $target = event.target
 				var friend_id = $target.getAttribute("friend-id")
 				if (friend_id == null) {
 					return
 				}

 				_this.$message_content.innerHTML = ""
 				// 并且刷新聊天界面
 				axios({
 					"method": "post",
 					"url": "/satori/home/" + friend_id + "/getUser"
 				}).then(function (response) {
 					var data = response.data
 					var user = data['data']

 					_this.current_whisper_friend_id = friend_id
 					_this.current_whisper_friend = user

 					_this.$friend_avatar.setAttribute("src", "assets/images/" + user.avatar)
 					_this.$friend_name.textContent = user.nickName
 					_this.$friend_intro.textContent = user.info

 					_this.getTargetFriendAllWhisper()

 				}).catch(function (error) {
 					console.log(error)
 				})
 			})

 			this.$chatter.addEventListener('blur', function () {
 				var value = _this.$chatter.value.trim()

 				_this.$chatter.value = ""
 				if (value.length === 0) {
 					SatoriModal.pop('请输入内容再发送哦', SatoriModal.INFO, 2000)
 					return
 				}
 				axios({
 					"method": "post",
 					"url": "/satori/friend/" + SESSION_userId + "/sendWhisper",
 					"params": {
 						"friendId": _this.current_whisper_friend_id,
 						"messageContent": value
 					}
 				}).then(function (response) {
 					SatoriModal.pop("发送成功", SatoriModal.SUCCESS, 1500)
 					_this.$message_content.appendChild(_this.getMyMessage({
 						messageContent: value
 					}))
 				}).catch(function (error) {
 					console.log(error)
 				})
 			})

 			whisper_receiver()

 			function whisper_receiver () {
 				setTimeout(function () {
 					_this.appendWhisperList()
 					whisper_receiver()
 				}, 5000)
 			}
 		},

 		/**
 		 * 如果有新消息，就追加到当前好友的消息队列中
 		 */
 		appendWhisperList: function () {
 			var _this = this
 			var target_friend_whisper_list = window.whisper_list[ _this.current_whisper_friend_id]
 			/**
 			 * 1. 没有跟这个人的消息
 			 * 2. 有消息
 			 * 3. 并且没有被渲染过
 			 */
 			if (target_friend_whisper_list == null) {
 				SatoriModal.pop('还没有新消息', SatoriModal.NORMAL, 1000)
 				return
 			}
 			/* 2 */
 			target_friend_whisper_list.reduce(function (v_rope, v_whisper) {
 				if (v_whisper.render) {
 					return
 				}
 				/* 3 */
 				v_whisper.render = true
 				_this.$message_content.appendChild(_this.getFriendsMessage(v_whisper))
 			}, "")

 			// _this.scroller.refresh()
 		},

 		emptyTip: function () {
 			return VD.compile(
 				e("div", {"class": "message-tip", "style": "position:relative;top: -260px"}, [
 					e("i", {"class": "circle-5x i-circle-5x"}),
 					e("span", {"class": "tip"}, "已经到顶啦")
 				])
 			)
 		},


 		getTargetFriendAllWhisper: function () {
 			var _this = this
			axios({
				"method": "post",
				"url": "/satori/friend/" + SESSION_userId + "/getTargetFriendAllWhisper",
				"params": {
				'friendId': _this.current_whisper_friend_id
				}
			}).then(function (response) {
				_this.$message_content.innerHTML = ''

				var data = response.data
				var whisper_all_list = data['data']

				var $fragment = document.createDocumentFragment()
				$fragment.appendChild(_this.emptyTip())
				if (whisper_all_list == null) {
					SatoriModal.pop('与该好友没有私信', SatoriModal.INFO)
					_this.$message_content.appendChild($fragment)
					return
				}

				whisper_all_list.reduce(function (v_rope, v_whisper) {
					// 设置该条私信为已经渲染
					var messageId = v_whisper.messageId

					if (window.whisper_list[ _this.current_whisper_friend_id][messageId] != null) {
						window.whisper_list[ _this.current_whisper_friend_id][messageId].render = true
					}
					// 如果自己是收信人，该条信息为好友发送的
					var receiver_id = v_whisper.receiverId + ""
					if (receiver_id === SESSION_userId) {
						$fragment.appendChild(_this.getFriendsMessage(v_whisper))
					} else {
						// 如果是发信人，该条信息为自己发送的
						$fragment.appendChild(_this.getMyMessage(v_whisper))
					}
				}, "")
				_this.$message_content.appendChild($fragment)
				// _this.scroller.refresh()
			}).catch(function (error) {
				console.log(error)
			})
 		},

 		getFriendList: function () {
 			var _this = this
 			axios({
 				"method": "post",
 				"url": "/satori/friend/" + SESSION_userId + "/friendsList",
 			}).then(function (response) {
 				console.info(response)
 				var data = response.data
 				var friend_list = data['data']
 				_this.$friends_list.innerHTML = ""
 				friend_list.reduce (function (v_rope, v_friend) {
 					_this.$friends_list.appendChild(_this.getFriendItem(v_friend))
 				}, "")
 				SatoriModal.pop("获取好友列表成功", SatoriModal.SUCCESS, 1500)

 				if (_this.current_whisper_friend_id == null) {
 					_this.current_whisper_friend_id = friend_list[0].userId
 				}
 				_this.getTargetFriendAllWhisper()

 			}).catch(function (error) {
 				console.log(error)
 			})
 		},

 		getFriendItem: function (v_data) {
 			return VD.compile(
 				e("li", {"class": "friends-item i-friends-item"}, [
 					e("div", {"class": "friends-avatar-container"}, [
 						e("img", {"src": "assets/images/" + v_data.avatar, "alt": v_data.nickName, "class": "friends-avatar-5x"})
 					]),
 					e("div", {"class": "friends-info"}, [
 						e("span", {"class": "friends-name", "friend-id": v_data.userId}, v_data.nickName)
 					])
 				])
 			)
 		},

 		getFriendsMessage: function (v_data) {
 			var _this = this
 			return VD.compile(
	 			e("div", {"class": "friend-message-item i-message-item"}, [
	 				e("div", {"class": "friend-avatar-container"}, [
	 					e("img", {"src": "assets/images/" + _this.current_whisper_friend.avatar, "alt": _this.current_whisper_friend.nickName, "class": "user-avatar-5x"})
	 				]),
	 				e("div", {"class": "friend-info"}, [
	 					e("div", {"class": "friend-header"}, [
	 						e("span", {"class": "friend-name"}, _this.current_whisper_friend.nickName, [
	 							e("span", {"class": "friend-send-time"}, v_data.sendDate)
	 						]),
							e("div", {"class": "friend-message-container"}, [
								e("p", {"class": "friend-message"}, v_data.messageContent)
							])
	 					])
	 				])
	 			])
 			)
 		},

 		getMyMessage: function (v_data) {
 			return VD.compile(
 				e("div", {"class": "my-message-item i-message-item"}, [
 					e("div", {"class": "my-avatar-container"}, [
 						e("img", {"src": "assets/images/" + SESSION_userAvatar, "alt": SESSION_nickName, "class": "user-avatar-5x"})
 					]),
 					e("div", {"class": "my-info"}, [
 						e("div", {"class": "my-header"}, [
 							e("span", {"class": "my-name"}, SESSION_nickName),
 							e("span", {"class": "my-send-time"}, v_data.sendDate || new Date())
 						]),
						e("div", {"class": "my-message-container"}, [
							e("p", {"class": "my-message"}, v_data.messageContent),
						])
 					])
 				])
 			)
 		}
 	}

 	window.SatoriWhisper = SatoriWhisper
})()

;
(function () {
	var SatoriPreview = function () {
		this._view = true

		this.init()
	}

	SatoriPreview.prototype = {
		constructor: SatoriPreview,

		init: function () {
			Object.defineProperty(this, 'view', {
				set: function (v_new_view) {
					if (v_new_view) {
						Template.$skill_layer.style.opacity = 0
						SatoriModal.pop('当前正在 预览模式，按下 ESC 退出', SatoriModal.INFO)
					} else {
						Template.$skill_layer.style.opacity = 1
						SatoriModal.pop('退出了 预览模式', SatoriModal.INFO)
					}
					_this._view = v_new_view
				},
				get: function () {
					return _this._view
				}
			})
		}
	}

	window.SatoriPreview = SatoriPreview
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


