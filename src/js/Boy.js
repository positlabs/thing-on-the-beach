var Boy = function(options){

	var boy = this;
	var boyTex = PIXI.Texture.fromImage('assets/imgs/boy.png');
	var sprite = new PIXI.Sprite(boyTex);

	var invincible = false;

	_.extend(this, {
		sprite: sprite,
		life: 3,
		damage: function(){
			if(invincible) return;
			invincible = true;
			
			//TODO some damage effect

			setTimeout(function(){
				invincible = false;
			}, 1000);
			boy.life--;
			console.log('boy.damage');
			return true;
		}
	});

};