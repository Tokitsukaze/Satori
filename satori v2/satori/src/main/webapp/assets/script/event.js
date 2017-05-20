;
(function () {
	var SatoriEvent = function () {
		this.init()
	}

	SatoriEvent.prototype = {
		constructor: SatoriEvent,

		init: function () {
			this.$satori = Template.$satori

			document.addEventListener('click', function (event) {
				var $target = event.target

				var state = {}
				var link = $target.getAttribute("s-link")
				if (link) {
					state.link = link
					var temp_url = link.split("switchStageTo")[1]
					var url = temp_url.substring(0, 1).toLowerCase() + temp_url.substring(1, temp_url.length)
					history.pushState(state, "", url)

					View[link]()
				}
			})

			window.addEventListener('popstate', function(event) {
				View.updateStage(event.state)
			})

			/*开启轮询*/
			this.comet()
		},

		/**
		 * 注册的一些组件
		 */
		input_signup_loginName: function (v_$el, v_$tip) {
			var _this = this
			var $tip = v_$tip
			v_$el.addEventListener("input", function (event) {
				var value = event.target.value
				var value_length = value.length
				if (value_length < 6) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "六位以上"
					_this.loginNameCheck = true
					return
				} else if (value_length > 20) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "二十位以下"
					_this.loginNameCheck = false
					return
				}

				axios.post('/satori/loginNameCheck')
				.then(function (response) {
					var data = response.data
					console.info(response)
					if (response.status === 200) {
						$tip.className = "i-r-result r-result-success"
						$tip.textContent = data.info
						_this.loginNameCheck = true
					} else {
						$tip.className = "i-r-result r-result-error"
						$tip.textContent = data.info
						_this.loginNameCheck = false
					}
				}).catch(function (error) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "系统错误"
					_this.loginNameCheck = false
					console.log(error);
				})

			})
		},

		input_signup_password: function (v_$el, v_$tip) {
			var _this = this
			var $tip = v_$tip
			v_$el.addEventListener("input", function (event) {
				var value = event.target.value
				var value_length = value.length
				if (value_length < 6) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "需要六位以上哦"
					_this.passwordCheck = false
					return
				} else if (value_length > 20) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "需要二十位以下哦"
					_this.passwordCheck = false
					return
				}
				$tip.className = "i-r-result r-result-success"
				$tip.textContent = "可用的密码"
				_this.passwordCheck = true
			})
		},

		input_signup_password_again: function (v_$el, v_$el2, v_$tip) {
			var _this = this
			var $tip = v_$tip
			v_$el.addEventListener("input", function (event) {
				var password = v_$el2.value
				var password_again = event.target.value
				if (password !== password_again) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "密码不相同"
					_this.passwordAgainCheck = false
					return
				}
				$tip.className = "i-r-result r-result-success"
				$tip.textContent = "可用的密码"
				_this.passwordAgainCheck = true
			})
		},

		input_signup_button: function (v_$el, v_$el2, v_$el3) {
			var _this = this
			v_$el.addEventListener('click', function (event) {
				console.info('v_$el2.value', v_$el2.value)
				console.info('v_$el3.value', v_$el3.value)
				if (_this.loginNameCheck && _this.passwordCheck && _this.passwordAgainCheck) {
					axios({
						"method": "post",
						"url": "/satori/signup",
						"params":{
							"loginName": v_$el2.value,
							"password": v_$el3.value
						}
					})
					.then(function (response) {
						if (response.status === 200) {
							View.updateStage("index")
						} else {
							console.log(response);
						}
					}).catch(function (error) {
						console.log(error);
					})
				}
			})
		},

		/**
		 * 登陆组件
		 */
		input_signin_loginName: function (v_$el, v_$tip) {
			var _this = this
			var $tip = v_$tip
			v_$el.addEventListener('input', function (event) {
				if (v_$el.value.length < 0) {
					$tip.style.display = "block"
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "用户名不能为空"
					_this.loginNameCheck = false
				} else {
					$tip.style.display = "none"
					_this.loginNameCheck = true
				}
			})
		},

		input_signin_password: function (v_$el, v_$tip) {
			var _this = this
			var $tip = v_$tip
			v_$el.addEventListener('input', function (event) {
				if (v_$el.value.length < 0) {
					$tip.style.display = "block"
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "密码不能为空"
					_this.passwordCheck = false
				} else {
					$tip.style.display = "none"
					_this.passwordCheck = true
				}
			})
		},

		input_signin_submit: function (v_$el, v_$el2, v_$el3) {
			var _this = this
			v_$el.addEventListener('click', function (event) {
				console.info('v_$el2.value', v_$el2.value)
				console.info('v_$el3.value', v_$el3.value)
				if (_this.loginNameCheck && _this.passwordCheck) {
					axios({
						"method": "post",
						"url": "/satori/signin",
						"params":{
							"loginName": v_$el2.value,
							"password": v_$el3.value
						}
					})
					.then(function (response) {
						if (response.status === 200) {
							var data = response.data.data
							console.info(response)
							SESSION_userId = data.userId
							SESSION_info = data.info
							SESSION_nickName = data.nickName
							SESSION_userAvatar = data.avatar
							SESSION_userImpression = data.impression
							View.updateStage("index")
						} else {
							console.log(response);
						}
					}).catch(function (error) {
						console.log(error);
					})
				}
			})
		},

		search_result_list: function (v_$el) {
			var $search_result_list = v_$el
			$search_result_list.addEventListener('click', function (event) {
				var $target = event.target
				var button_type = $target.getAttribute('button-type')
				if (button_type == null) {
					return
				}
				var button_type_info = button_type.split('/')
				var action = button_type_info[0]
				var friend_id = button_type_info[1]
				console.info('button_type_info', button_type_info)
				if (action === 'become_friends') {
					axios({
						'method': 'post',
						'url': '/satori/friend/' + SESSION_userId + '/inviteFriend',
						'params': {
							'friendId': friend_id
						}
					})
					.then(function (response) {
						console.info(response)
						if (response.status === 200) {
							SatoriModal.pop('已发送邀请', SatoriModal.SUCCESS)
						} else {
							console.log(error);
						}
					}).catch(function (error) {
						console.log(error);
					})
				}
			})
		},

		/**
		 * 与服务器的轮询连接
		 * 1. 判断是否有好友接受了邀请
		 * 2. 判断是否有聊天信息
		 */
		comet: function () {
			var _this = this
			window.whisper_list = {}

			startComet()

			function startComet () {
				setTimeout(function () {
					console.info(SESSION_userId)
					if (SESSION_userId.length !== 0) {
						_comet()
					}
					startComet()
				}, 3000)
			}


			/* 已经存在的邀请 */
			var invitation_exist = {}
			var invitation_last = 0
			function _comet () {
				axios({
					'method': 'post',
					'url': '/satori/comet/' + SESSION_userId,
				})
				.then(function (response) {
					if (response.status === 200) {
						var data = response.data

						var invite_list = data.inviteList
						if (invite_list != null) {
							/* 1 */
							invite_list.reduce (function (v_rope, v_inviter) {
								var user_id = v_inviter.userId
								if (invitation_exist[user_id]) {
									return
								} else {
									SatoriModal.popInvite(v_inviter.nickName + ' 想邀请你成为好友', SatoriModal.INFO, 300000, v_inviter.userId)
									invitation_exist[user_id] = true
								}
							}, 0)
						}
						var whisperList = data.whisperList
						whisperList.reduce(function (v_rope, v_whisper) {
							console.info('v_whisper', v_whisper)
							var whisper_id = v_whisper.messageId
							var sender_Id = v_whisper.senderId

							/**
							 * 如果还没有与这个人聊过天，那么就新建 对她的消息队列
							 */
							if (window.whisper_list[sender_Id] == null) {
								window.whisper_list[sender_Id] = []
								window.whisper_list[sender_Id][whisper_id] = {
									messageContent: v_whisper.messageContent,
									sendDate: v_whisper.sendDate
								}
								return

							// 如果聊过天了
							} else if (window.whisper_list[sender_Id] != null) {
								// 看看有没有这条消息
								// 如果没有那么就加入
								if (window.whisper_list[sender_Id][whisper_id] == null) {
									window.whisper_list[sender_Id][whisper_id] = {
										messageContent: v_whisper.messageContent,
										sendDate: v_whisper.sendDate
									}
								} else {
									return
								}
							}
						}, "")









					} else {
						console.log(error);
					}
				}).catch(function (error) {
					console.log(error);
				})
			}
		},








		/**
		 * skill_top组件 的一些配置
		 */
		skill_top_index: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("index")
			})
		},

		skill_top_map: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("map")
			})
		},

		skill_top_search: function (v_$el) {
			var $inputer = v_$el
			$inputer.addEventListener('blur', function (event) {
				var current_value = $inputer.value

				if (current_value.length < 1) {
					return
				}
				View.updateStage("search")
				document.getElementById('search-keyword').textContent = current_value
				SatoriModal.pop("搜索中", SatoriModal.INFO, 2000)
				axios({
					"method": "get",
					"url": "/satori/search",
					"params":{
						"keyword": current_value,
					}
				})
				.then(function (response) {
					if (response.status === 200) {
						var data = response.data
						console.info(data)
						var user_list = data.userList
						var project_list = data.projectList
						var $list = document.getElementById('search-result-list')
						var $fragment = user_list.reduce(function (v_$fragment, v_User) {
							return v_$fragment.appendChild(Template['search_card_type_user'](v_User))
						}, document.createDocumentFragment())

						$list.appendChild($fragment)

						$fragment = project_list.reduce(function (v_$fragment, v_Project) {
							return v_$fragment.appendChild(Template['search_card_type_project'](v_Project))
						}, document.createDocumentFragment())

						$list.appendChild($fragment)
						SatoriModal.pop("搜索完毕", SatoriModal.SUCCESS, 2000)
					} else {
						console.log(response);
					}
				}).catch(function (error) {
					console.log(error);
				})
			})
		},

		skill_top_project: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("index")
			})
		},

		skill_top_store: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("store")
			})
		},

		skill_top_note: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("note")
			})
		},

		skill_top_friend: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("friend")
			})
		},

		skill_top_home: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("home")
			})
		},

		skill_top_signup: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("signup")
			})
		},

		skill_top_signin: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("signin")
			})
		},



		/**
		 * home组件 的一些配置
		 */
		home_trend: function (v_$el, v_$center, v_$card_list) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("trend", v_$center, v_$card_list)
			})
		},

		home_project: function (v_$el, v_$center, v_$card_list, v_$count) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("project", v_$center, v_$card_list, v_$count)
			})
		},

		home_note: function (v_$el, v_$center, v_$card_list) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("note", v_$center, v_$card_list)
			})
		},

		home_friend: function (v_$el, v_$center, v_$card_list, v_$count) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("friend", v_$center, v_$card_list, v_$count)
			})
		},

		home_store: function (v_$el, v_$center, v_$card_list, v_$count) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("store", v_$center, v_$card_list, v_$count)
			})
		},

		home_setting: function (v_$el, v_$center, v_$card_list) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("setting", v_$center, v_$card_list)
			})
		},

		home_center: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				// event.preventDefault()
				var $target = event.target
				var href = $target.getAttribute("href")
				if (href == null) {
					return
				}
				CURRENT_PROJECT_ID = href.split("/satori/project/")[1]
				View.updateStage("prototype")
				event.preventDefault()
			})
		},

		/**
		 * Prototype 相关
		 */
		activePrototpye: function (v_$dom) {
			window.Harusame = new SatoriPrototype({
				$prototype_layer: Template.layers.$prototype_layer,
				$prototype_utils: v_$dom.$skill_component
			})
		},

		setting_nickName: function (v_$el, v_$tip) {
			var _this = this
			var $tip = v_$tip
			console.info("v_$el", v_$el)
			v_$el.addEventListener('input', function (event) {
				var value = v_$el.value
				var value_length = value.length
				if (value_length < 1) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "一位以上"
					_this.nickNameCheck = false
					return
				} else if (value_length > 20) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "二十位以下"
					_this.nickNameCheck = false
					return
				}
				$tip.textContent = "或许可以用"
				_this.nickNameCheck = true
			})

			v_$el.addEventListener('blur', function (event) {
				console.info("v_$el.value", v_$el.value)
				var temp_value = v_$el.value
				if (_this.nickNameCheck) {
					axios({
						'method': 'post',
						'url': '/satori/home/' + SESSION_userId + '/updateNickName',
						'params': {
							'nickName': temp_value
						}
					})
					.then(function (response) {
						var data = response.data
						console.info(response)
						if (response.status === 200) {
							$tip.style.opacity = 1
							$tip.className = "i-r-result r-result-success"
							$tip.textContent = data.info
							document.getElementById('user-nick-name').textContent = temp_value
							document.getElementById('skill-top-user-nick-name').textContent = temp_value
							SESSION_nickName = temp_value
							setTimeout(function () {
								$tip.style.opacity = 0
							}, 2000)
						} else {
							$tip.style.opacity = 1
							$tip.className = "i-r-result r-result-error"
							$tip.textContent = data.info
						}
					}).catch(function (error) {
						$tip.style.opacity = 1
						$tip.className = "i-r-result r-result-error"
						$tip.textContent = "系统错误"
						console.log(error);
					})
				}
			})
		},

		setting_info: function (v_$el, v_$tip) {
			var _this = this
			var $tip = v_$tip
			v_$el.addEventListener('input', function (event) {
				var value = v_$el.value
				var value_length = value.length
				if (value_length < 1) {
					$tip.style.opacity = 1
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "1 个字以上"
					_this.nickNameCheck = false
					return
				} else if (value_length > 20) {
					$tip.style.opacity = 1
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "140 个字以下"
					_this.nickNameCheck = false
					return
				}
				$tip.textContent = "或许可以用"
				_this.nickNameCheck = true
			})

			v_$el.addEventListener('blur', function (event) {
				var temp_value = v_$el.value
				if (_this.nickNameCheck) {
					axios({
						'method': 'post',
						'url': '/satori/home/' + SESSION_userId + '/updateInfo',
						'params': {
							'info': temp_value
						}
					})
					.then(function (response) {
						var data = response.data
						console.info(response)
						if (response.status === 200) {
							$tip.style.opacity = 1
							$tip.className = "i-r-result r-result-success"
							$tip.textContent = data.info
							document.getElementById('user-info').textContent = temp_value
							SESSION_info = temp_value
							setTimeout(function () {
								$tip.style.opacity = 0
							}, 2000)
						} else {
							$tip.className = "i-r-result r-result-error"
							$tip.textContent = data.info
							$tip.style.opacity = 1
						}
					}).catch(function (error) {
						$tip.style.opacity = 1
						$tip.className = "i-r-result r-result-error"
						$tip.textContent = "系统错误"
						console.log(error);
					})
				}
			})
		},

		setting_avatar: function (v_$el, v_$tip, v_$form) {
			var _this = this
			var $tip = v_$tip

			v_$el.addEventListener('blur', function (event) {
				$(v_$form).ajaxSubmit({
					type : "POST",
					url : '/satori/home/' + SESSION_userId + '/updateUserAvatar',
					dataType : "json",
					error : function(data) {
						$tip.style.opacity = 1
						$tip.className = "i-r-result r-result-error"
						$tip.textContent = "上传头像 好像出问题啦"
						console.log(error);
					},
					success : function(data) {
						$tip.style.opacity = 1
						$tip.className = "i-r-result r-result-success"
						$tip.textContent = data.info
						setTimeout(function () {
							$tip.style.opacity = 0
						}, 2000)
						setTimeout(function () {
							axios({
								'method': 'post',
								'url': '/satori/home/' + SESSION_userId + '/getUser',
							})
							.then(function (response) {
								console.info(response.data)
								var avatar = response.data.data.avatar
								SESSION_userAvatar = avatar
								document.getElementById("avatar").setAttribute("src", "assets/images/" + avatar)
							}).catch(function (error) {
								console.log(error)
							})
						}, 5000)
						console.info(data)
					}
				})
			})
		},

		setting_impression: function (v_$el, v_$tip, v_$form) {
			var _this = this
			var $tip = v_$tip

			v_$el.addEventListener('blur', function (event) {
				$(v_$form).ajaxSubmit({
					type : "POST",
					url : '/satori/home/' + SESSION_userId + '/updateImpression',
					dataType : "json",
					error : function(data) {
						$tip.style.opacity = 1
						$tip.className = "i-r-result r-result-error"
						$tip.textContent = "上传印象 好像出问题啦"
						console.log(error);
					},
					success : function(data) {
						$tip.style.opacity = 1
						$tip.className = "i-r-result r-result-success"
						$tip.textContent = data.info
						setTimeout(function () {
							$tip.style.opacity = 0
						}, 2000)
						setTimeout(function () {
							axios({
								'method': 'post',
								'url': '/satori/home/' + SESSION_userId + '/getUser',
							})
							.then(function (response) {
								var impression = response.data.data.impression
								SESSION_userImpression = impression
								document.getElementById("impression").setAttribute("src", "assets/images/" + impression)
							}).catch(function (error) {
								console.log(error)
							})
						}, 5000)
						console.info(data)
					}
				})
			})
		},

		btn_create_project: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				SatoriMask.create_project()
			})

		},
	}

	window.SatoriEvent = new SatoriEvent()
})()
