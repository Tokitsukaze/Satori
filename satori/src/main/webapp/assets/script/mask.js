;
(function () {
	var SatoriMask = function () {
		this.$mask = Template.layers.$mask_layer

		this.initHTML()
		this.mountHTML()
		this.init()
	}

	SatoriMask.prototype = {
		constructor: SatoriMask,

		initHTML: function () {
			this.$project_name = VD.compile(e("input", {"type": "text", "name": "name", "class": "r-input i-r-input", "placeholder": "项目的名字"}))
			this.$project_nameTip = VD.compile(e("span", {"class": "i-r-result"}))

			this.$project_info = VD.compile(e("textarea", {"type": "text","name": "info", "class": "r-input i-r-input", "placeholder": "是个怎么样的项目呢", "style": "height: 200px; padding-top: 10px;"}))
			this.$project_infoTip = VD.compile(e("span", {"class": "i-r-result"}))

			this.$project_create_submit =VD.compile(e("div", {"class": "next r-submit i-r-submit"}, "创建项目"))

			this.$project_create_form = VD.compile(
				e("form", {"method": "post"}, [
					e("div", {"class": "card-item type-input"}, [
						e("div", {"class": "left"}, [
							e("div", {"class": "card-avatar-container"}, [
								e("img", {"src": "", "alt": "名字", "class": "card-avatar-5x"})
							]),
						]),
						e("div", {"class": "right"}, [
							e("div", {"class": "info-container"}, [
								this.$project_name,
								this.$project_nameTip,
								e("ul", {"class": "condition-list"}, [
									e("li", {"class": "condition-item"}, "一位以上"),
									e("li", {"class": "condition-item"}, "二十位以下"),
								]),
							])
						]),
					]),
					e("div", {"class": "card-item type-input"}, [
						e("div", {"class": "left"}, [
							e("div", {"class": "card-avatar-container"}, [
								e("img", {"src": "", "alt": "介绍", "class": "card-avatar-5x"})
							]),
						]),
						e("div", {"class": "right"}, [
							e("div", {"class": "info-container"}, [
								this.$project_info,
								this.$project_infoTip,
								e("ul", {"class": "condition-list"}, [
									e("li", {"class": "condition-item"}, "一位以上"),
									e("li", {"class": "condition-item"}, "二百位以下"),
								]),
							])
						]),
					]),
					e("div", {"class": "operation-container"}, [
						this.$project_create_submit
					])
				])
			)

			this.$mask_component = VD.compile(
				e("div", {"class": "mask-component", "id": "mask-project-create"}, [
					e("div", {"class": "top"}, [
						e("img", {"class": "project-avatar"})
					]),
					e("div", {"class": "bottom"}, [
						this.$project_create_form
					])
				])
			)
		},

		mountHTML: function () {
			this.$mask.appendChild(this.$mask_component)
		},

		init: function () {
			var _this = this
			this.$mask.addEventListener('click', function (event) {
				_this.$mask.style.display = 'none'
				_this.$mask_component.style.display = 'none'
			})

			this.$mask_component.addEventListener('click', function (event) {
				event.stopPropagation()
			})

			this.$project_create_submit.addEventListener('click', function (event) {
				$(_this.$project_create_form).ajaxSubmit({
					type : "POST",
					url : '/satori/project/' + SESSION_userId + '/insertProject',
					dataType : "json",
					error : function(data) {
						console.info(data)
						_this.$mask_component.style.display = 'none'
						_this.$mask.style.display = 'none'
						SatoriModal.pop("创建项目失败", SatoriModal.ERROR)
					},
					success : function(data) {
						_this.$mask_component.style.display = 'none'
						_this.$mask.style.display = 'none'
						View.updateViewHome("project", document.getElementById('home-center'), document.getElementById('home-card-list'), document.getElementById('project-count'))
						SatoriModal.pop("创建项目成功", SatoriModal.SUCCESS)
					}
				})
			})
		},

		create_project: function () {
			var display = this.$mask_component.style.display
			if (display === 'none') {
				this.$mask_component.style.display = 'block'
				this.$mask.style.display = 'block'
			} else {
				this.$mask_component.style.display = 'none'
				this.$mask.style.display = 'none'
			}
		}
	}

	window.SatoriMask = new SatoriMask()
})()
