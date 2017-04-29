;
window.onload = function () {
	var state = {
		$group_component: 0,
		$tab_component: 0,
		$branch_component: 0
	}

	var doms = {
		$util_layer: document.querySelector('.util-layer'),
		$tab_component: document.querySelector('.tab-component'),

		$chat_layer: document.querySelector('.chat-layer'),
		$group_component: document.querySelector('.chat-component-full'),

		$branch_layer: document.querySelector('.branch-layer'),
		$branch_component: document.querySelector('.branch-component')

	}

	var eds = {
		$tab: document.querySelector('#tab'),
		$group: document.querySelector('#group'),
		$branch: document.querySelector('#branch')
	}

	stateCheck()
	eventsBind()

	function eventsBind () {
		var SIGN = '_component'
		for (var ekey in eds) {
			var val = ekey + SIGN

			;(function (val) {
				eds[ekey].addEventListener('click', function () {
					console.info('val', val)
					if (state[val] === 0) {
						state[val] = 1
					} else {
						state[val] = 0
					}
				})
			})(val)

		}
	}

	function stateCheck () {
		for (var skey in state) {
			var value = state[skey]
			var temp_skey = '_' + skey

			;(function (temp_skey, skey) {
				Object.defineProperty(state, skey, {
					set: function (v_new) {
						console.info('doms[skey]', doms[skey])
						if (v_new === 1) {
							doms[skey].style.display = 'block'
						} else {
							doms[skey].style.display = 'none'
						}
						state[temp_skey] = v_new
					},
					get: function () {
						return state[temp_skey]
					}
				})
			})(temp_skey, skey)
			state[skey] = value
		}
	}

}

