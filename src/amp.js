define(['src/easing.js'], function(easing) {

	// Line constructs a line for drawing, and takes an object.
	// { origin ({x,y}), (opt)delta ({x,y}), length, angle, duration, delay, width, style, easing }
	var Line = function(line) {
		// Bound the angle so it's always 0 <= angle <= 2pi
		if (line.angle && (!line.dx || !line.dy)) {
			line.angle = line.angle % ( 2 * Math.PI );
			line.delta = {
				x: line.length * Math.cos(line.angle),
				y: line.length * Math.sin(line.angle)
			};
		}
		this.origin = line.origin;
		this.delta = line.delta;
		this.length = line.length;
		this.angle = line.angle;
		this.duration = line.duration
		this.delay = line.delay;
		this.width = line.width;
		this.style = line.style;
		this.easing = line.easing;
	};

	Line.prototype.draw = function(context) {
		var _this = this;
		this.timeout = window.setTimeout( 
			function() {
				var startTime, currTime, draw;
				startTime = Date.now();

				draw = function() {
					var end;
					currTime = Date.now();
					context.beginPath();
					context.strokeStyle = _this.style;
					context.lineWidth = _this.width;
					context.moveTo( _this.origin.x, _this.origin.y );
					end = {
						x: _this.easing(currTime - startTime, _this.origin.x, _this.delta.x, _this.duration * 1000),
						y: _this.easing(currTime - startTime, _this.origin.y, _this.delta.y, _this.duration * 1000),
					};
					context.lineTo(end.x, end.y);
					context.stroke();
					context.closePath();
					if (currTime <= (startTime + _this.duration + 1000)) {
						window.requestAnimationFrame(draw)
					}
				};

				draw();
			},
			this.delay * 1000
		);
	};



	var Amp = function(canvas) {
		this.types = [];
		this.shapes = [];

		this.ease = easing;
		// this.ease = {
		// 	linear: function(t, s, c, d) {
		// 		return c * t / d + s;
		// 	},
		// 	expOut: function(timeSinceStart, startVal, change, duration) {
		// 		return change * ( -Math.pow( 2, -10 * timeSinceStart/ (duration) ) + 1 ) + startVal;
		// 	}
		// };

		this.ratio = window.devicePixelRatio || 1;
		canvas.style.width = canvas.width;
		canvas.style.height = canvas.height;
		canvas.width = canvas.width * window.devicePixelRatio;
		canvas.height = canvas.height * window.devicePixelRatio;

		this.canvas = canvas.getContext('2d');
		this.canvas.scale(this.ratio,this.ratio);
	};

	Amp.prototype.draw = function() {
		while (this.shapes.length > 0) {
			this.shapes.pop().draw(this.canvas);
		}
	};

	Amp.prototype.drawLine = function(line) {
	};
	// addLine takes an object
	// { x, y, length, angle, duration, delay, width, style, easing }
	Amp.prototype.addLine = function(line) {
		this.shapes.push(new Line(line));
	};

	return Amp;
});
