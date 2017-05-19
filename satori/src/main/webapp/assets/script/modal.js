;
(function () {
	/**
	 * 模态框
	 */
	var SatoriModal = function () {
		this.$modal_layer = document.getElementById('modal-layer')

		this.initHTML()
		this.mountHTML()
		this.init()

		this.NORMAL = 'normal'
		this.SUCCESS = 'success'
		this.ERROR = 'error'
		this.INFO = 'info'

		this.TAB = {
			CREATE: 'TAB_CREATE'
		}
	}

	SatoriModal.prototype = {
		constructor: SatoriModal,

		initHTML: function () {
			this.$modal_list = VD.compile(e('div', {'class': 'modal-list'}))
			// this.$mask = VD.compile(e('div', {'class': 'modal-mask'}))
		},

		mountHTML: function () {
			this.$modal_layer.appendChild(this.$modal_list)
		},

		init: function () {

		},

		/**
		 * 弹出信息框
		 */
		pop: function (v_info, v_type, v_duration) {
			var _this = this
			var $modal = VD.compile(e('div', {'class': 'modal-item ' + v_type}, v_info))
			this.$modal_list.appendChild($modal)
			setTimeout(function () {
				$modal.style.opacity = 1
			}, 250)
			setTimeout(function () {
				$modal.style.opacity = 0
			}, v_duration - 250 || 3000 - 250)
			setTimeout(function () {
				_this.$modal_list.removeChild($modal)
			}, v_duration || 3000)
		},
	}

	window.SatoriModal = new SatoriModal()
})()
