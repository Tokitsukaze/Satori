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
				console.info(event)
				var link = event.state.link
				View[link]()
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


		/**
		 * home组件 的一些配置
		 */
		home_trend: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateHome("trend")
			})
		},

		home_project: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateHome("project")
			})
		},

		home_note: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateHome("note")
			})
		},

		home_denpa: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateHome("denpa")
			})
		},

		home_store: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateHome("store")
			})
		},

		home_setting: function (v_$el) {
			v_$el.addEventListener('click', function (event) {
				event.preventDefault()
				View.updateHome("setting")
			})
		},

	}

	window.SatoriEvent = new SatoriEvent()
})()
