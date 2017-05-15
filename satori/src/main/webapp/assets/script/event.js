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
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("search")
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

		skill_top_denpa: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateStage("denpa")
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

		home_denpa: function (v_$el, v_$center, v_$card_list, v_$count) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateViewHome("denpa", v_$center, v_$card_list, v_$count)
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
				event.preventDefault()
				var $target = event.target
				var href = $target.getAttribute("href")
				if (href != null) {
					View.updateStage("prototype")
					View.updateViewPrototype(href.split("/satori/project/")[1])
				}
			})
		},

		/**
		 * Prototype 相关
		 */
		activePrototpye: function (v_$skill_list) {
			// new Prototype(v_$skill_list)
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
				if (_this.nickNameCheck) {
					axios({
						'method': 'post',
						'url': '/satori/home/' + SESSION_userId + '/updateNickName',
						'params': {
							'nickName': v_$el.value
						}
					})
					.then(function (response) {
						var data = response.data
						console.info(response)
						if (response.status === 200) {
							$tip.className = "i-r-result r-result-success"
							$tip.textContent = data.info
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
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "1 个字以上"
					_this.nickNameCheck = false
					return
				} else if (value_length > 20) {
					$tip.className = "i-r-result r-result-error"
					$tip.textContent = "140 个字以下"
					_this.nickNameCheck = false
					return
				}
				$tip.textContent = "或许可以用"
				_this.nickNameCheck = true
			})

			v_$el.addEventListener('blur', function (event) {
				if (_this.nickNameCheck) {
					axios({
						'method': 'post',
						'url': '/satori/home/' + SESSION_userId + '/updateInfo',
						'params': {
							'info': v_$el.value
						}
					})
					.then(function (response) {
						var data = response.data
						console.info(response)
						if (response.status === 200) {
							$tip.className = "i-r-result r-result-success"
							$tip.textContent = data.info
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
	}

	window.SatoriEvent = new SatoriEvent()
})()
