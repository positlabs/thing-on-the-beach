var Boy = function(options){

	var boyTex = PIXI.Texture.fromImage('assets/imgs/boy.png');
	var sprite = new PIXI.Sprite(boyTex);

	return {
		sprite: sprite
	};

};