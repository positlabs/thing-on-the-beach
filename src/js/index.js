var stageWidth = 1280;
var stageHeight = 720;

var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var Tentacle = function(options){
	console.log('Tentacle', options);

	var tentacleWidth = 1749;
	var tentacleHeight = 494;
	var segments = 15;
	var segmentLength = tentacleWidth / segments;

	var yStr = 80;
	var xStr = 100;

	var points = [];
	for (var i = 0; i < segments; i++){
		points.push(new PIXI.Point(i * segmentLength, 0));
	}

	var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('assets/imgs/tentacle.png'), points);
	strip.x = -tentacleWidth;

	var snakeContainer = new PIXI.Container();
	snakeContainer.position.x = stageWidth + xStr;
	snakeContainer.position.y = 300;
	snakeContainer.scale.set(tentacleHeight / tentacleWidth);
	stage.addChild(snakeContainer);

	snakeContainer.addChild(strip);

	function update(time) {
		for (var i = 0; i < points.length; i++) {
			points[i].y = Math.sin((i * 0.5) + time) * yStr;
			points[i].x = i * segmentLength + Math.cos((i * 0.3) + time) * xStr;
		}
	}

	return {
		update: update,
		container: snakeContainer
	};
};

var tentacles = [];
tentacles.push(new Tentacle());

var time = 0;
var update = function(){
	time += 0.1;
	tentacles.forEach(function(tentacle){
		tentacle.update(time);
	});
	renderer.render(stage);
	requestAnimationFrame(update);
};
update();








