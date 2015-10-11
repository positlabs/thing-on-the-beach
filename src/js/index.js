
// globals
var $ = function(selector){ return document.querySelector(selector); };
var stageWidth = 1280;
var stageHeight = 720;
var time = 0;


(function(){

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

	var cameraShakeTimeout;
	var camRotation = 0;
	var camTilt = 0;
	var camPan = 0;
	var currentAlpha = 0;
	var currentBeta = 0;
	var currentGamma = 0;
	var splash = $('#splash');
	var game = new Game({
		container: worldContainer
	});

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
	$('canvas').addEventListener('touchstart', goFullscreen);

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
		console.log('startGame');
		window.addEventListener('deviceorientation', onDeviceOrientation);
		TweenLite.to($('canvas'), 2, {opacity: 1, onComplete: function(){
			game.start();
		}});
	};

	var endGame = function(){
		// show end screen
		TweenLite.to($('#game-over'), 1, {autoAlpha: 1});

		$('.fb-share-btn').addEventListener('click', function(){
			var url = 'https://www.facebook.com/sharer/sharer.php?u=';
			url += 'https://www.indiegogo.com/projects/thing-on-the-beach-film-a-monster-lurks/x/7314522';
			window.open(url, '_blank', 'width=600, height=400');
		});
		$('.replay-btn').addEventListener('click', function(){
			window.location.reload();
		});
	};
	game.gameOver = endGame;
	// endGame()

	var update = function(){
		time += 0.1;

		camRotation *= 0.95; // drag back to zero
		camTilt *= 0.95;
		camPan *= 0.95;
		worldContainer.x = stageWidth * 0.5 + camPan * 4;
		worldContainer.y = stageHeight * 0.5 + -camTilt * 4;

		game.update();

		renderer.render(stage);
		requestAnimationFrame(update);
	};
	
	update();
	showSplash();
	// startGame();

})();








