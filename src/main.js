require(['amp'], function(Amp) {
	var Amp = new Amp(document.getElementById('demo'));

	var colors = [
		"#00e6ff",
		"#0066ff",
		"#1900ff",
		"#ff9900"
	];

	for ( var i = 0; i < 10; i++ ) {
		Amp.addLine(
			{
				origin: {
					x: 50 + Math.floor(Math.random() * 950),
					y: 10
				},
				length: 50 + Math.floor(Math.random() * 950), 
				angle: Math.random() * Math.PI,
				easing: Amp.ease.expOut,
				delay: Math.random(),
				duration: 1,
				width: 3,
				style: colors[Math.floor(Math.random() * 4)]
			}
		);
	}

	Amp.draw();

});
