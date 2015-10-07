var Tentacle = function(options){
	console.log('Tentacle', options);

	var tentacleWidth = 1749;
	var tentacleHeight = 494;
	var segments = 15;
	var segmentLength = tentacleWidth / segments;

	var props = {
		yStr: 30,
		xStr: 50
	};

	var points = [];
	for (var i = 0; i < segments; i++){
		points.push(new PIXI.Point(i * segmentLength, 0));
	}

	var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('assets/imgs/tentacle.png'), points);
	strip.x = -tentacleWidth;

	var sprite = new PIXI.Container();
	sprite.scale.set(tentacleHeight / tentacleWidth);
	sprite.addChild(strip);

	var timeOffset = Math.random() * 10; 
	function update(time) {
		time += timeOffset;
		for (var i = 0; i < points.length; i++) {
			points[i].y = Math.sin((i * 0.5) + time) * props.yStr;
			points[i].x = i * segmentLength + Math.cos((i * 0.3) + time) * props.xStr;
		}
	}

	var attack = function(){
		TweenMax.to(props, 2, {xStr: 180, yStr: 180, yoyo: true, repeat: 1});
	};

	return {
		update: update,
		sprite: sprite,
		attack: attack
	};
};