requirejs.config({
		"paths": {
			"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
			"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min"
		}
});

require(['amp', 'jquery', 'underscore'], function(Amp, $, _) {
	// Boring size control stuff.
	var canvas, parent, width, height, lastCount;
	// Get the size of the parent and set the demo to be the width of the parent
	// and be 1/3rd as tall as it is wide.
	parent = $('#demo').parent();
	width = parent.width();
	height = parent.width() / 3;
	canvas = document.getElementById('demo');
	canvas.height = height;
	canvas.width = parent.width();

	// Initialize a new instance with the canvas, from which a context will be
	// extracted.
	var Amp = new Amp(canvas);

	// Demo-specific creation function. This lays out a few restrictions on
	// parameters (colors, direction, etc) and randomly creates lines. The 
	// lines could also be a pre-created array rather than random.
	var create = function(n, ease) {
		var tmp;
		var colors = [
			"#00e6ff",
			"#0066ff",
			"#1900ff",
			"#ff9900"
		];
		var directions = [
			Math.PI / 4,
			3 * Math.PI / 4,
			5 * Math.PI / 4,
			7 * Math.PI / 4
		];
		if (lastCount != n) {
			// If we're drawing a different number of lines, create new random lines.
			Amp.shapes = [];
			for (var i = 0; i < n; i++) {
				(Math.random() > .5) ? 
					Amp.addCircle({
						origin: {
							x: 20 + Math.floor(Math.random() * (width - 40)),
							y: 20 + Math.floor(Math.random() * (height - 40))
						},
						radius: 10 + Math.floor(Math.random() * (height / 20)), 
						easing: ease,
						delay: Math.random() * 1000,
						duration: 1000,
						style: colors[Math.floor(Math.random() * 4)]
					}) :
					Amp.addLine({
						origin: {
							x: 20 + Math.floor(Math.random() * (width - 40)),
							y: 20 + Math.floor(Math.random() * (height - 40))
						},
						length: 10 + Math.floor(Math.random() * 100), 
						angle: directions[Math.floor(Math.random() * 4)],
						easing: ease,
						delay: Math.random() * 1000,
						duration: 1000,
						cap: 'round',
						width: 10 * Math.random(),
						style: colors[Math.floor(Math.random() * 4)]
					});
			};
		} else {
			// If we're drawing the same number of lines, just update the easing
			// function and reset its state.
			for (var i = 0; i < n; i++) {
				Amp.shapes[i].easing = ease;
			};
		}
		lastCount = n;
	};
	create(50, Amp.ease.outExpo);
	Amp.draw();

	// Boring form related stuff.
	$(document).ready(function() {
		$('[data-draw]').click(function(event) {
			var $east, $count;
			$ease = $('select[name=ease]');
			$count = $('input[name=count]');
			create($count.val(), Amp.ease[$ease.val()]);
			Amp.clear();
			Amp.draw();
		});
	});

});
