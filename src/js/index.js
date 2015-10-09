
var $ = function(selector){ return document.querySelector(selector); };

(function(){

	var stageWidth = 1280;
	var stageHeight = 720;

	var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
	document.body.appendChild(renderer.view);

	var stage = new PIXI.Container();

	var worldContainer = new PIXI.Container();
	worldContainer.pivot.set(stageWidth/2, stageHeight/2);
	worldContainer.position.set(stageWidth/2, stageHeight/2);
	stage.addChild(worldContainer);

	// TODO: higher res beach image. Should be retina 720p
	var bgTexture = PIXI.Texture.fromImage('assets/imgs/beach.jpg');
	var bg = new PIXI.Sprite(bgTexture);
	bg.x = -stageWidth * 0.08;
	bg.y = -stageHeight * 0.08;
	bg.scale.set(1.16, 1.16);
	worldContainer.addChild(bg);
	window.bg = bg;

	var boy = new Boy();
	boy.sprite.scale.set(0.3, 0.3);
	boy.sprite.x = stageWidth * 0.5;
	boy.sprite.y = stageHeight * 0.4;
	worldContainer.addChild(boy.sprite);
	console.log(boy);

	var tentacles = [];
	window.tentacles = tentacles;
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());
	tentacles.push(new Tentacle());

	var leftX = -50;
	var rightX = stageWidth + 50;

	tentacles[0].sprite.x = rightX;
	tentacles[0].sprite.y = stageHeight * 0.5;
	tentacles[0].sprite.scale.x *= 1.2;
	tentacles[0].sprite.scale.y *= 1.2;

	tentacles[1].sprite.x = rightX;
	tentacles[1].sprite.y = stageHeight * 0.7;
	tentacles[1].sprite.scale.y *= -1;

	tentacles[2].sprite.scale.x *= -1;
	tentacles[2].sprite.x = leftX;
	tentacles[2].sprite.y = stageHeight * 0.5;

	tentacles[3].sprite.scale.x *= -1;
	tentacles[3].sprite.scale.y *= -1;
	tentacles[3].sprite.x = leftX;
	tentacles[3].sprite.y = stageHeight * 0.7;

	tentacles.forEach(function(tentacle){
		worldContainer.addChild(tentacle.sprite);
		// stage.addChild(tentacle.sprite);
	});

	console.log(tentacles);

	var time = 0;
	var cameraShakeTimeout;
	var camRotation = 0;
	var camTilt = 0;
	var camPan = 0;
	var currentAlpha = 0;
	var currentBeta = 0;
	var currentGamma = 0;
	var splash = $('#splash');

	$('canvas').addEventListener('touchstart', goFullscreen);

	var showSplash = function(){
		var img = document.createElement('img');
		img.src = $('#splash img').src;
		img.onload = function(){
			TweenLite.to(splash, 2, {opacity: 1});
			TweenLite.to(splash, 6, {y: -splash.offsetHeight + window.innerHeight, delay: 1, ease: Power2.easeInOut, onComplete: function(){
				TweenLite.to(splash, 2, {autoAlpha: 0, onComplete: function(){
					startGame();
				}});
			}});
		};
	};

	var startGame = function(){
		window.addEventListener('deviceorientation', onDeviceOrientation);
		TweenLite.to($('canvas'), 2, {opacity: 1});
	};

	var goFullscreen = function(){
		console.log('goFullscreen');
		$('canvas').removeEventListener('touchstart', goFullscreen);

		var element = document.body;
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	};

	var onDeviceOrientation = function(e){
		// console.log('alpha:', e.alpha);
		var alphaDelta = e.alpha - currentAlpha;
		alphaDelta = Math.min(20, alphaDelta);
		alphaDelta = Math.max(-20, alphaDelta);
		camRotation += alphaDelta;
		currentAlpha = e.alpha;

		var gammaDelta = e.gamma - currentGamma;
		gammaDelta = Math.min(20, gammaDelta);
		gammaDelta = Math.max(-20, gammaDelta);
		camTilt += gammaDelta;
		currentGamma = e.gamma;

		var betaDelta = e.beta - currentBeta;
		betaDelta = Math.min(20, betaDelta);
		betaDelta = Math.max(-20, betaDelta);
		camPan += betaDelta;
		currentBeta = e.beta;
	};

	var endGame = function(){
		// show end screen
		clearTimeout(cameraShakeTimeout);
	};

	var update = function(){
		time += 0.1;

		camRotation *= 0.95; // drag back to zero
		camTilt *= 0.95;
		camPan *= 0.95;
		worldContainer.x = stageWidth * 0.5 + camPan * 4;
		worldContainer.y = stageHeight * 0.5 + -camTilt * 4;

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
	// showSplash();
	startGame();

})();








