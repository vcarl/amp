	// Get the context of the canvas so we can draw on it.
  var canvasElement = document.getElementById('header-canvas');
  canvasElement.width = document.body.clientWidth;
  canvasElement.height = document.body.clientHeight;

	var canvas = canvasElement.getContext('2d');


	// Easing function for animation. Takes the current time
	function easeOutExpo (timeSinceStart, startVal, change, duration) {
		return change * ( -Math.pow( 2, -10 * timeSinceStart/duration ) + 1 ) + startVal;
	};

	function drawLines(lines) {
		for ( var i = 0; i < lines.length; i++ ) {
			drawLine(lines[i]);
		}
	}

	function drawLine (line) {
		var endpoint = endLine ( {x: line.x, y: line.y}, line.direction, line.length );
		(function(end) {
			window.setTimeout( 
				function() {
					change = {
						x: (end.x - line.x),
						y: (end.y - line.y)
					};
					animateLine(line, change, new Date().getTime(), line.duration, line.width, line.style); 
				},
				line.delay * 1000
			);
		})(endpoint);
	}

	function createDrawFunc(start, change, startTime, duration, width, style) {
		function draw() {
			currTime = new Date().getTime();
      canvas.beginPath();
			canvas.strokeStyle = style;
			canvas.lineWidth = width;
			canvas.moveTo( start.x, start.y );
			line = {
				x: easeOutExpo( currTime - startTime, start.x, change.x, duration ),
				y: easeOutExpo( currTime - startTime, start.y, change.y, duration ),
			}
			canvas.lineTo( line.x, line.y );
			canvas.stroke();
			canvas.closePath();

			if ( currTime <= ( startTime + ( duration )) ) {
				requestAnimationFrame(draw)
			}
		}
		return draw;
	}

	function animateLine(start, change, startTime, duration, width, style) {
		animation = createDrawFunc( start, change, startTime, duration * 1000, width, style );
		animation();
	}

	/** Get the endpoint for a line.
	 * @param origin object An object containing an x and y property.
	 * @param heading number The angle the line to go in radians.
	 * @param length number How long the line should be in pixels.
	 * @return an object with an x and y parameter.
	 */ 
	function endLine ( origin, heading, length ) {
		var dX, dY, angle;
		// Bound the heading so it's always 0 <= heading < 2pi
		heading = heading % ( 2 * Math.PI );

		// Handle less trivial directions. 
		dX = length * Math.cos( heading );
		dY = length * Math.sin( heading );

		return {
			x: (origin.x + dX),
			y: (origin.y + dY),
		}

	}

(function() {
  
  var lines = [];

  var directions = [
     Math.PI / 4,
     3 * Math.PI / 4
  ];
  
	var colors = [
		"#00e6ff",
		"#0066ff",
		"#1900ff",
		"#ff9900"
	];

	for ( var i = 0; i < 80; i++ ) {
		lines.push(
			{
				x: 50 + Math.floor(Math.random() * canvasElement.width),
				y: -20,
				length: 50 + Math.floor(Math.random() * 950), 
				direction: directions[Math.floor(Math.random() * 3)],
				ease: easeOutExpo,
				delay: Math.random() * .75,
				duration: .75,
				width: 3 + Math.pow(2, Math.floor((Math.random() * 6))),
				style: colors[Math.floor(Math.random() * 4)]
			}
		);
	}
  
  drawLines(lines);
})();