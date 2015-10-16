var Tentacle = function(options){
	console.log('Tentacle', options);

	var type = Math.random() > 0.5 ? 'thin' : 'thick';
	// var type = 'thin';
	var attacking = false;

	var tentacleWidth = type === 'thick' ? 1749 : 754 * 2;
	var tentacleHeight = type === 'thick' ? 494 : 182 * 2;

	var segments = 35;
	var segmentLength = tentacleWidth / segments;

	var props = {
		yStr: type === 'thin' ? 50 : 25,
		xStr: type === 'thin' ? 20 : 10
	};

	var points = [];
	for (var i = 0; i < segments; i++){
		points.push(new PIXI.Point(i * segmentLength, 0));
	}

	var randPath = type === 'thin' ? '-deformed' : '';
	var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('assets/imgs/tentacle' + randPath + '.png'), points);
	var sprite = new PIXI.Container();
	sprite.scale.set(0.7);
	sprite.addChild(strip);

	var timeOffset = Math.random() * 10; 
	function update(time) {
		time += timeOffset;
		for (var i = 0; i < points.length; i++) {
			points[i].y = Math.sin((i * 0.5) + time) * props.yStr;
			points[i].x = i * segmentLength + Math.cos((i * 0.3) + time) * props.xStr;
		}
	}

	var attack = function(speed, dist){
		if(attacking) return false;
		if(speed === undefined) speed = 2;
		attacking = true;

		var x = dist;
		if(sprite.x > stageWidth/2) x = stageWidth - dist;
		
		TweenMax.to(sprite, speed, {x: x, yoyo: true, repeat: 1});
		TweenMax.to(props, speed, {xStr: '*=4', yStr: '*=4', yoyo: true, repeat: 1});
		setTimeout(function(){
			attacking = false;
		}, speed * 2 + 100);
	};

	return {
		update: update,
		sprite: sprite,
		attack: attack
	};
};