;(function () {
	var SatoriPrototype = function () {

	}

	_ = SatoriPrototype.prototype = {
		constructor: SatoriPrototype,


	}
})()

;(function () {
	var oldY= null;
	var isdown = false;

	var $target = document.querySelector('.prototype')
	console.info('$target', $target)
	$target.addEventListener("mousedown", function (event) {
		isdown = true
		oldY = event.clientY
	})

	document.addEventListener("mousemove", function (event) {
		if (isdown) {
			$target.style.transform = "rotate(" + (event.clientY - oldY) + "deg)"
		}
	})

	document.addEventListener("mouseup", function (event) {
		isdown = false
		oldY = null
	})
})()

