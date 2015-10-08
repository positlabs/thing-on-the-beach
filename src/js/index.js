
var $ = function(selector){ return document.querySelector(selector); };

(function(){

	var stageWidth = 1280;
	var stageHeight = 720;

	var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
	document.body.appendChild(renderer.view);

	var stage = new PIXI.Container();

	var bgTexture = PIXI.Texture.fromImage('assets/imgs/beach.jpg');
	var bg = new PIXI.Sprite(bgTexture);
	bg.pivot.set(stageWidth/2, stageHeight/2);
	bg.position.set(stageWidth/2, stageHeight/2);
	stage.addChild(bg);
	window.bg = bg;

	var boy = new Boy();
	boy.sprite.scale.set(0.3, 0.3);
	boy.sprite.x = stageWidth * 0.5;
	boy.sprite.y = stageHeight * 0.4;
	bg.addChild(boy.sprite);
	console.log(boy);

	var tentacles = [];
	window.tentacles = tentacles;
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());
	// tentacles.push(new Tentacle());
	// tentacles.push(new Tentacle());

	var leftX = -300;
	var rightX = stageWidth - 300;

	tentacles[0].sprite.x = rightX;
	tentacles[0].sprite.y = stageHeight * 0.6;
	tentacles[0].sprite.scale.x *= 1.2;
	tentacles[0].sprite.scale.y *= 1.2;

	tentacles[1].sprite.x = rightX;
	tentacles[1].sprite.y = stageHeight * 0.8;
	tentacles[1].sprite.scale.y *= -1;

	// tentacles[2].sprite.scale.x *= -1;
	// tentacles[2].sprite.x = leftX;
	// tentacles[2].sprite.y = stageHeight * 0.6;

	// tentacles[3].sprite.scale.x *= -1;
	// tentacles[3].sprite.x = leftX;
	// tentacles[3].sprite.y = stageHeight * 0.8;

	tentacles.forEach(function(tentacle){
		stage.addChild(tentacle.sprite);
	});

	console.log(tentacles);

	var time = 0;
	var update = function(){
		time += 0.1;

		// hit testing!!
		var hit = false;
		tentacles.forEach(function(tentacle){
			tentacle.update(time);
			var hitTentacle = hitTest(boy.sprite, tentacle.sprite);
			hit = hitTentacle || hit;
			if(hitTentacle) console.log(boy.sprite.x, boy.sprite.width, tentacle.sprite.x, tentacle.sprite.width);
		});
		if(hit){
			console.log('hit!!!!!!!!!!');
			//TODO: do something
		}

		renderer.render(stage);
		requestAnimationFrame(update);
	};
	update();

	var showSplash = function(){

	};

	var cameraShakeTimeout;

	var startGame = function(){
		shakeCamera();
	};

	var shakeCamera = function(){
		var dur = Math.random() * 3 + 1;
		cameraShakeTimeout = setTimeout(shakeCamera, dur * 1000);
		TweenLite.to(bg, dur, {rotation: Math.random()*0.2 - 0.1, ease: Power2.easeInOut});
	};

	var endGame = function(){
		// show end screen
		clearTimeout(cameraShakeTimeout);
	};

	startGame();

})();








