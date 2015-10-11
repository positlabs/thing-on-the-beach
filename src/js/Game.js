
var Game = function(options){

	var container = options.container;
	var game = this;
	var difficulty = 0;

	var boy = new Boy();
	boy.sprite.scale.set(0.3, 0.3);
	boy.sprite.x = stageWidth * 0.5;
	boy.sprite.y = stageHeight * 0.4;
	container.addChild(boy.sprite);
	console.log(boy);

	var tentacles = [];
	window.tentacles = tentacles;
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());

	var leftX = -100;
	var rightX = stageWidth + 200;

	tentacles[0].sprite.x = rightX;
	tentacles[0].sprite.y = stageHeight * 0.5;
	// tentacles[0].sprite.scale.x *= 1.2;
	// tentacles[0].sprite.scale.y *= 1.2;

	tentacles[1].sprite.scale.y *= -1;
	tentacles[1].sprite.x = rightX;
	tentacles[1].sprite.y = stageHeight * 0.7;


	tentacles[2].sprite.scale.y *= -1;
	tentacles[2].sprite.rotation = Math.PI;
	tentacles[2].sprite.x = leftX;
	tentacles[2].sprite.y = stageHeight * 0.5;

	tentacles[3].sprite.rotation = Math.PI;
	tentacles[3].sprite.x = leftX;
	tentacles[3].sprite.y = stageHeight * 0.7;

	tentacles.forEach(function(tentacle){
		container.addChild(tentacle.sprite);
	});

	var attack = function(){

		var tentacle = _.sample(tentacles);
		var speed = 3 - Math.min(2.5, difficulty/20);
		var dist = 	(Math.random() * stageWidth * 0.5) + 	// random dist
					(stageWidth * 0.1) + 					// min dist
					Math.min(100, Math.random() * difficulty * 10);		// difficulty modifier
		tentacle.attack(speed, dist);

		console.log('Game.attack', speed, dist);

		difficulty += 2;
		setTimeout(attack, speed * 1000 * 2);
	};

	var update = function(){
		if(!game.running) return;
		// hit testing!!
		var hit = false;
		tentacles.forEach(function(tentacle){
			tentacle.update(time);
			var hitTentacle = hitTest(boy.sprite, tentacle.sprite.getBounds());
			hit = hitTentacle || hit;
		});
		if(hit){
			console.log('hit!!!!!!!!!!');

			boy.damage();
			if(boy.life === 0){
				endGame();
			}
		}
	};
	var endGame = function(){
		game.running = false;
		game.gameOver();
	};

	_.extend(this, {
		running: false,
		update: update,
		start: function(){
			game.running = true;
			attack();
		},
		// external callback method
		gameOver: function(){}
	});

};