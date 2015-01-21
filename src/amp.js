define(['src/easing.js'], function(easing) {
	'use strict';
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
		this.done = false;
		this.origin   = line.origin   || {x: 0, y: 0};
		this.angle    = line.angle    || Math.PI / 2;
		this.duration = line.duration || 1000;
		this.delay    = line.delay    || 0;
		this.style    = line.style    || '#000000';
		this.easing   = line.easing   || easing.linear;
		this.cap      = line.cap      || 'butt';
		this.delta    = line.delta;
		this.length   = line.length;
		this.width    = line.width;
	};

	Line.prototype.draw = function(context, start, current) {
		var end, time;
		current = Date.now();
		time = Math.floor(((current - start) > this.delay) ? (current - start) - this.delay : 0);
		if (time > this.duration) {
			this.done = true;
			end = {
				x: this.origin.x + this.delta.x,
				y: this.origin.y + this.delta.y,
			};
		} else {
			this.done = false;
			end = {
				x: this.easing(time, this.origin.x, this.delta.x, this.duration),
				y: this.easing(time, this.origin.y, this.delta.y, this.duration),
			};
		}
		context.beginPath();
		context.strokeStyle = this.style;
		context.lineCap = this.cap;
		context.lineWidth = this.width;
		context.moveTo( this.origin.x, this.origin.y );
		context.lineTo(end.x, end.y);
		context.stroke();
		context.closePath();
	};




	// Line constructs a circl for drawing.
	// { origin ({x,y}), radius, duration, delay, style, easing }
	var Circle = function(circle) {
		this.done = false;
		this.origin   = circle.origin   || {x: 0, y: 0};
		this.easing   = circle.easing   || easing.linear;
		this.duration = circle.duration || 1000;
		this.delay    = circle.delay    || 0;
		this.style    = circle.style    || '#000000';
		this.fill     = circle.fill     || true;
		this.radius   = circle.radius
	};

	Circle.prototype.draw = function(context, start, current) {
		var radius, time;
		current = Date.now();
		time = Math.floor(((current - start) > this.delay) ? (current - start) - this.delay : 0);
		if (time > this.duration) {
			this.done = true;
			radius = this.radius
		} else {
			this.done = false;
			radius = this.easing(time, 0, this.radius, this.duration);
		}
		context.beginPath();
		context.strokeStyle = context.fillStyle = this.style;
		context.arc(this.origin.x, this.origin.y, radius, 0, 2 * Math.PI);
		(this.fill) ? context.fill() : context.stroke();
		context.closePath();
	};



	var Amp = function(canvas) {
		this.done = false;
		this.types = [];
		this.shapes = [];

		this.ease = easing;

		this.ratio = window.devicePixelRatio || 1;
		canvas.style.width = canvas.width;
		canvas.style.height = canvas.height;
		canvas.width = canvas.width * window.devicePixelRatio;
		canvas.height = canvas.height * window.devicePixelRatio;

		this.size = {
			width: canvas.width,
			height: canvas.height
		};

		this.context = canvas.getContext('2d');
		this.context.scale(this.ratio,this.ratio);
	};

	Amp.prototype.clear = function() {
		this.context.clearRect(
			-this.size.width, -this.size.height,
			2 * this.size.width, 2 * this.size.height);
	};

	Amp.prototype.draw = function() {
		var start, current, update;
		start = Date.now();

		update = function() {
			this.done = true;
			this.clear();

			for (var i = 0; i < this.shapes.length; i++) {
				this.shapes[i].draw(this.context, start, current);
				if (this.done && !this.shapes[i].done) {
					this.done = false;
				};
			}
			if (!this.done) {
				window.requestAnimationFrame(update);
			}
		}.bind(this);

		window.requestAnimationFrame(update);

	};

	Amp.prototype.addShape = function(shape) {
		this.shapes.push(shape);
		this.shapes.sort(function(a, b) {
			return a.delay < b.delay;
		})
	}

	// addLine takes an object
	// { x, y, length, angle, duration, delay, width, style, easing }
	Amp.prototype.addLine = function(line) {
		this.addShape(new Line(line));
	};
	Amp.prototype.addCircle = function(circle) {
		this.addShape(new Circle(circle));
	};

	return Amp;
});
