/*

config = {
    // 需要滚动的内容
    content: Selector or Element-Node
    // 视口的高度，如果不指明，则为content的父元素
    viewport: Selector or Element-Node

    // 如果没有自己定义滚动样式，那么就必须选择一个挂载点，之后会自动创建默认样式的滚动条
    if () {
        // 滚动条挂载点
        mountpoint: Selector or Element-Node
    }
    else {
         // 滚动条
        scroll: Selector or Element-Node
        // 滚动条内的滚动球
        scroller: Selector or Element-Node
    }

    // 可选内容
        //滚动事件绑定位置
        scrollevent: Selector or Element-Node
        // 自定义scroll 样式
        scrollstyle: default
        // 自定义scroller 样式
        scrollerstyle: default
        // 滚动速度
        speed: 100
        // 缓动
        tweet: linear
        // 初始滚动条位置
        scrolloffsetY: 0
}

*/
;
(function () {
    // 缓存浏览器类型检查
    var browser
    var transform = getAdaptiveTransform()

    var SatoriScroller = function (v_config) {
        // 得到所有必须的元素节点信息
        this.content_node = typeCheck(v_config.content)

        // 设置视口元素节点信息，否则默认为 content_node 的父元素
        var temp_viewport = v_config.viewport
        if (temp_viewport) {
            this.viewport_node = typeCheck(temp_viewport)
        } else {
            this.viewport_node = this.content_node.parentNode
        }

        // 得到滚动条创建位置，并且初始化滚动条组件的元素节点
        var temp_scroll = v_config.scroll
        var temp_scroller = v_config.scroller
        var temp_mountpoint = v_config.mountpoint
        // 如果指定了滚动条的元素节点
        if (temp_scroll && temp_scroller) {
            this.scroll_node = typeCheck(temp_scroll)
            this.scroller_node = typeCheck(temp_scroller)
        // 否则查看是否有指定滚动条挂载位置
        } else if (temp_mountpoint) {
            this.mountpoint_node = typeCheck(temp_mountpoint)
            var temp_save = this._createScrollComponent(v_config.scrollstyle, v_config.scrollerstyle)
            this.scroll_node = temp_save.scroll
            this.scroller_node = temp_save.scroller

            this.mountpoint_node.appendChild(this.scroll_node)
        // 如果没有挂载位置也没有指定滚动条元素节点，那么就将挂载位置设为视口元素节点上
        } else {
            this.mountpoint_node = this.viewport_node
            var temp_save = this._createScrollComponent(v_config.scrollstyle, v_config.scrollerstyle)
            this.scroll_node = temp_save.scroll
            this.scroller_node = temp_save.scroller

            this.mountpoint_node.appendChild(this.scroll_node)
        }

        // 滚动速度
        this.speed = v_config.speed || 100

        // 绑定滚动事件的元素节点
        var temp_scrollevent = v_config.scrollevent
        if (temp_scrollevent) {
            this.scrollevent_node = typeCheck(temp_scrollevent)
        } else {
            this.scrollevent_node = this.viewport_node
        }

        // 初始化 => 绑定事件
        this._init(v_config)
    }

    SatoriScroller.prototype = {
        constructor: SatoriScroller,

        /**
         * 初始化，并做一些检查
         */
        _init: function (v_config) {
            this.refresh(v_config)
            // 绑定滚动事件
            this.setScrollEvent(this.scroller_offsetY, this.content_offsetY)
            // 设定初始滚动位置
            this._setScrollData(this.scroller_offsetY, this.content_offsetY)
        },

        /**
         * 重新检测高度
         */
        refresh: function (v_config) {
            // 得到实际高度
            var viewport_height = this.viewport_node.clientHeight
            var content_height = this.content_node.clientHeight
            var scroll_height = this.scroll_node.clientHeight

            // scroller 与 content 的平衡比率
            this.speed_rate = content_height / viewport_height

            var scroller_height =  scroll_height / this.speed_rate
            // 设定scroller 的初始高度
            this.scroller_node.style.height = scroller_height + 'px'

            // 高度偏移量
            this.scroller_offsetY = v_config.scrolloffsetY || 0
            this.content_offsetY = scroller_height * this.scroller_offsetY

            // scroller 最高滚动高度
            this.scroller_max = 0
            // scoller 最低滚动高度
            this.scroller_min = scroll_height - scroller_height

            this.speed_rate = content_height / viewport_height
        },

        /**
         * 事件解绑
         */
        release: function () {

        },

        /**
         * 处理滚动事件的数据
         */
        _getScrollData: function (v_data_scroll) {
            // 上边界检测
            if (this.scroller_offsetY < this.scroller_max) {
                this.scroller_offsetY = this.scroller_max
                return
            }

            // 下边界检测
            if (this.scroller_offsetY > this.scroller_min) {
                this.scroller_offsetY = this.scroller_min
                return
            }

            this.scroller_offsetY = this.scroller_offsetY +  -50 * this.speed / v_data_scroll
            this.content_offsetY = this.scroller_offsetY * -this.speed_rate

             this._setScrollData(this.scroller_offsetY, this.content_offsetY)
        },

        /**
         * 设置滚动对象的位置
         */
        _setScrollData: function (v_scroller_offsetY, v_content_offsetY) {
            this.scroller_node.style[transform] = 'translate(0, ' + v_scroller_offsetY + 'px)'
            this.content_node.style[transform] = 'translate(0, ' + v_content_offsetY + 'px)'
        },

        /**
         * 绑定滚动事件
         */
        setScrollEvent: function () {
            var that = this
            if (navigator.userAgent.toLowerCase().indexOf('mozilla') === 0) {
                this.scrollevent_node.addEventListener('DOMMouseScroll', function (event) {
                    var data_scroll = - event.detail * 40
                    that._getScrollData(data_scroll)
                    event.preventDefault()
                })
            } else {
                this.scrollevent_node.addEventListener('mousewheel', function (event) {
                    var data_scroll = event.wheelDelta
                    that._getScrollData(data_scroll)
                    event.preventDefault()
                })
            }
        },

        /**
         * 创建默认scroll 组件
         */
        _createScrollComponent: function (scroll_style, scroller_style) {
            var scroll = document.createElement('div')
            scroll_style != null ? scroll.setAttribute('class', scroll_style) : scroll.style.cssText = "height: 100%; width: 10px; background-color: rgba(118, 45, 138, .3); position: absolute; top: 0; right: 0"
            var scroller = document.createElement('div')
            scroller_style != null ? scroller.setAttribute('class', scroller_style) : scroller.style.cssText = "width: 100%; background-color: rgba(118, 45, 138, 1);"
            scroll.appendChild(scroller)
            return {scroll: scroll, scroller: scroller}
        }
    }

    /**
     * 根据浏览器适配得到合适的transform属性
     */
    function getAdaptiveTransform () {
        var transform = ''
        var style_checker = document.createElement('div').style
        list_transform = ['transform', 'webkitTransform', 'MozTransform', 'msTransform']
        for (var i = 0; i < list_transform.length; i++) {
            if (list_transform[i] in style_checker) {
                return transform = list_transform[i]
            }
        }
    }

    /**
     * 类型检查并且总是为返回元素节点
     */
    function typeCheck (v_selector) {
        return typeof v_selector === 'object' ? v_selector : document.querySelector('v_selector')
    }

    window.SatoriScroller = SatoriScroller

})()
