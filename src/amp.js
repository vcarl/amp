define([], function() {
	var Amp = function(canvas) {
		this.types = [];
		this.shapes = [];

		this.ease = {
			expOut: function(timeSinceStart, startVal, change, duration) {
				return change * ( -Math.pow( 2, -10 * timeSinceStart/ (duration) ) + 1 ) + startVal;
			}
		};

		this.ratio = window.devicePixelRatio || 1;
		canvas.style.width = canvas.width;
		canvas.style.height = canvas.height;
		canvas.width = canvas.width * window.devicePixelRatio;
		canvas.height = canvas.height * window.devicePixelRatio;

		this.canvas = canvas.getContext('2d');
		this.canvas.scale(this.ratio,this.ratio);
	};

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

	Amp.prototype.draw = function() {
		while (this.shapes.length > 0) {
			this.drawLine(this.shapes.pop());
		}
	};

	Amp.prototype.drawLine = function(line) {
		var _this = this;
		window.setTimeout( 
			function() {
				var startTime, currTime, draw;
				startTime = Date.now();

				draw = function() {
					var end;
					currTime = Date.now();
					_this.canvas.beginPath();
					_this.canvas.strokeStyle = line.style;
					_this.canvas.lineWidth = line.width;
					_this.canvas.moveTo( line.origin.x, line.origin.y );
					end = {
						x: line.easing(currTime - startTime, line.origin.x, line.delta.x, line.duration * 1000),
						y: line.easing(currTime - startTime, line.origin.y, line.delta.y, line.duration * 1000),
					};
					_this.canvas.lineTo(end.x, end.y);
					_this.canvas.stroke();
					_this.canvas.closePath();
					if (currTime <= (startTime + line.duration + 1000)) {
						window.requestAnimationFrame(draw)
					}
				};

				draw();
			},
			line.delay * 1000
		);
	};
	// addLine takes an object
	// { x, y, length, angle, duration, delay, width, style, easing }
	Amp.prototype.addLine = function(line) {
		this.shapes.push(new Line(line));
	};

	return Amp;
});
