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
			var _this = this
			// 这里处理接受
			this.$modal_list.addEventListener('click', function (event) {
				var $target = event.target
				var friend_id = $target.getAttribute('friend-id')
				if (friend_id == null) {
					return
				}
				var $modal_item = $target.parentNode
				$modal_item.style.opacity = 0
				setTimeout(function () {
					_this.$modal_list.removeChild($modal_item)
				}, 250)

				axios({
					'method': 'post',
					'url': '/satori/friend/' + SESSION_userId + '/acceptInvite',
					'params': {
						'friendId': friend_id
					}
				})
				.then(function (response) {
					console.info(response)
					if (response.status === 200) {
						_this.pop('接受了邀请', _this.SUCCESS)
					} else {
						console.log(error);
					}
				}).catch(function (error) {
					console.log(error);
				})
			})
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

		/**
		 * 弹出邀请信息框
		 */
		popInvite: function (v_info, v_type, v_duration, v_friend_id) {
			var _this = this
			var $modal = VD.compile(e('div', {'class': 'modal-item ' + v_type}, v_info, [
				e('span', {'class': 'modal-item-accpet', 'friend-id': v_friend_id}, '接受'),
				e('span', {'class': 'modal-item-reject'}, '拒绝')
			]))
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
		}
	}

	window.SatoriModal = new SatoriModal()
})()
