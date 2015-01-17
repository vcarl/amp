requirejs.config({
    "paths": {
      "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

require(['amp', 'jquery'], function(Amp, $) {
	$(document).ready()
	var canvas, section, width, height;
	section = $('#main-content');
	canvas = document.getElementById('demo');
	width = section.width();
	height = section.width() / 3;
	canvas.height = height;
	canvas.width = section.width();


	var Amp = new Amp(canvas);

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

	for ( var i = 0; i < 60; i++ ) {
		Amp.addLine(
			{
				origin: {
					x: Math.floor(Math.random() * width),
					y: -5
				},
				length: 100 + Math.floor(Math.random() * (height - 70)), 
				angle: directions[Math.floor(Math.random() * 2)],
				easing: Amp.ease.expOut,
				delay: Math.random(),
				duration: 1,
				width: 10 * Math.random(),
				style: colors[Math.floor(Math.random() * 4)]
			}
		);
	}

	Amp.draw();

});
