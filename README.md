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
		// Math.PI / 2 (default)
		angle: Math.PI / 2,
		// The easing function to use.
		// Amp.ease.linear (default)
		easing: Amp.ease.expOut,
		// The delay (in ms) before beginning animation.
		// 1000 (default)
		delay: 1000,
		// The length of time (in ms) drawing should take.
		// 1000 (default)
		duration: 1000,
		// The width of the line in px.
		width: 5,
		// Style can be anything context.strokeStyle is compatible with.
		// "#000000" (default)
		style: "#0000ff",
		// What kind of cap the line should have.
		// round, square, butt (default)
		cap: 'round'
	});

	// Begin the animations.
	Amp.draw();
```
