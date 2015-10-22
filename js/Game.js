
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
		if(!game.running) return;

		var tentacle = _.sample(tentacles);
		var speed = 2.5 - Math.min(2, difficulty/30);
		var dist = 	(Math.random() * stageWidth * 0.5) + 				// random dist
					(stageWidth * 0.1) + 								// min dist
					Math.min(200, Math.random() * difficulty * 10);		// difficulty modifier
		tentacle.attack(speed, dist);

		console.log('Game.attack', speed, dist);

		difficulty += 4;
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

			var damaged = boy.damage();
			if(damaged){
				game.onBoyDamaged(boy.life);
			}
			
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
		boy: boy,
		start: function(){
			game.running = true;
			attack();
		},
		// external callback methods
		gameOver: function(){},
		onBoyDamaged: function(){}
	});

};