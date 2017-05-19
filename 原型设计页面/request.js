;
(function () {
	var request = {}

	/*request.get = function (v_config, v_success, v_error) {
		axios(v_config).then(function (response) {
			v_success && v_success(response)
		}).then(function (error) {
			v_error && v_error(error)
			console.error(error)
		})
	}*/

	request.data = function (v_config, v_success, v_error) {
		var result = null
		 switch (v_config) {
			 case 'tabList':
				result = [
					{'tabId': 4, 'name': '大学社团管理系统'},
					{'tabId': 5, 'name': '测试页面'},
					{'tabId': 6, 'name': '图书管理系统'}
				]
		}
		return result
	}

	window.SatoriRequest = request
})()
