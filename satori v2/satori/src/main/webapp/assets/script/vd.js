;
(function () {
	function VD () {
		this._init()
	}

	VD.prototype = {
		constructor: VD,

		_init: function () {
			this.tree_dom = []
			this.nid_next = 0
		},

		/**
		 * 解析虚拟DOM
		 */
		compile: function (v_nid) {
			var node = this._compileNode(v_nid)
			this._init()
			return node
		},

		/**
		 * 创建节点，原理同vnode
		 */
		e: function (v_type, v_props, v_text, v_children) {
			var obj = {}
			var nid = this._getNid()

			obj.type = v_type
			obj.nid = nid
			var constructor_props
			try {
				constructor_props = v_props.constructor
			} catch (e) {
				this.tree_dom[nid] = obj
				return nid
			}

			if (constructor_props === Object) {
				obj.props = v_props
			} else if (constructor_props === String) {
				obj.text = v_props
			} else if (constructor_props === Array) {
				obj.children = v_props
				this.tree_dom[nid] = obj
				return nid
			}

			var constructor_text
			try {
				constructor_text = v_text.constructor
			} catch (e) {
				this.tree_dom[nid] = obj
				return nid
			}

			if (constructor_text === String) {
				obj.text = v_text
			} else if (constructor_text === Array) {
				obj.children = v_text
				this.tree_dom[nid] = obj
				return nid
			} else {
				this.tree_dom[nid] = obj
				return nid
			}

			obj.children = v_children
			this.tree_dom[nid] = obj
			return nid
		},

		/**
		 * 得到一个元素的编号
		 */
		_getNid: function () {
			this.nid_next++
			return this.nid_next
		},

		/**
		 * 根据一个映射dom对象创建一个节点
		 */
		_compileNode: function (v_nid) {
			var v_node = this.tree_dom[v_nid]
			var node = document.createElement(v_node.type)

			var props = v_node.props
			if (props) {
				for (var attribute in props) {
					node.setAttribute(attribute, props[attribute])
				}
			}

			var text = v_node.text
			if (text) {
				node.textContent = text
			}
			var that = this
			var children = v_node.children
			if (children) {
				children.reduce(function (v_rope, v_child_nid) {
					// 如果已经是一个节点了，直接添加
					if (typeof v_child_nid === 'object') {
						return node.appendChild(v_child_nid)
					}
					// 不解析被删除的节点
					if (v_child_nid !== -1) {
						return node.appendChild(that._compileNode(v_child_nid))
					}
				}, {})
			}
			return node
		}
	}

	window.VD = new VD()
	window.e = function (v_type, v_props, v_text, v_children) {
		return window.VD.e.call(window.VD, v_type, v_props, v_text, v_children)
	}
})()
