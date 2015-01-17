# Amp

Easily create simple straight line animations.

## Basic usage

```javascript
	// Create a new instance of Amp with the DOM element for your canvas.
	var Amp = new Amp(document.getElementById('amp-canvas-id'));

	Amp.addLine({
		// The origin point for the line
		origin: {
			x: 0,
			y: 0
		},
		// The length in pixels of the line.
		length: 100,
		// The angle (in radians) the line should be drawn at.
		angle: Math.PI / 2,
		// The easing function to use. 
		// Currently the only easing function provided is exponential out.
		easing: Amp.ease.expOut,
		// The delay (in seconds) before beginning animation.
		delay: 1,
		// The length of time (in seconds) drawing should take.
		duration: 1,
		// The width of the line in px.
		width: 5,
		// Style can be anything context.strokeStyle is compatible with
		style: "#0000ff"
	});

	// Begin the animations.
	Amp.draw();
```
