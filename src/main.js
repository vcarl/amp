requirejs.config({
    "paths": {
      "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min"
    }
});

require(['amp', 'jquery', 'underscore'], function(Amp, $, _) {
	var canvas, section, width, height;
	section = $('#main-content');
	canvas = document.getElementById('demo');
	width = section.width();
	height = section.width() / 3;
	canvas.height = height;
	canvas.width = section.width();

	var Amp = new Amp(canvas);

	window.count = 10;
	window.ease = Amp.ease.outExpo;

	var create = function(n, ease) {
			var colors = [
			"#00e6ff",
			"#0066ff",
			"#1900ff",
			"#ff9900"
		];
	  var directions = [
	     Math.PI / 4,
	     3 * Math.PI / 4
	  ];
	  for (var i = 0; i < n; i++) {
	  	Amp.addLine({
				origin: {
					x: Math.floor(Math.random() * width),
					y: -5
				},
				length: 100 + Math.floor(Math.random() * (height - 70)), 
				angle: directions[Math.floor(Math.random() * 2)],
				easing: ease,
				delay: Math.random(),
				duration: 1,
				width: 10 * Math.random(),
				style: colors[Math.floor(Math.random() * 4)]
			});
	  };
	};
	create(10, Amp.ease.outExpo);
	Amp.draw();

	$(document).ready(function() {
		var $east, $count;
		$ease = $('select[name=ease]');
		$ease.change(function(event) {
			$count = $('input[name=count]');
			create($count.val(), Amp.ease[event.target.value]);
			Amp.draw();
		});
	});

});
