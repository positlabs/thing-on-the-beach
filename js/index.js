
// globals
var $ = function(selector){ return document.querySelector(selector); };
var $$ = function(selector){ return document.querySelectorAll(selector); };
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

	var filter = new PIXI.filters.ColorMatrixFilter();
	window.filter = filter;
	worldContainer.filters = [filter];

	var bgTexture = PIXI.Texture.fromImage('assets/imgs/beach2.jpg');
	var bg = new PIXI.Sprite(bgTexture);
	bg.x = stageWidth/2 - 800;
	bg.y = stageHeight/2 - 600;
	worldContainer.addChild(bg);
	window.bg = bg;

	// vignette
	var vignetteTex = PIXI.Texture.fromImage('assets/imgs/vignette.png');
	var vignette = new PIXI.Sprite(vignetteTex);
	vignette.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	vignette.alpha = 0.75;
	stage.addChild(vignette);
	window.vignette = vignette;

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
		TweenMax.to($('#instructions'), 2, {autoAlpha: 1});
		TweenMax.to($('#instructions'), 1, {autoAlpha: 0, delay: 6});
		update();
	};

	var lastX = 0;
	var hammertime = new Hammer($('body'), {});
	hammertime.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	hammertime.on('pan', function(ev) {
		// console.log(ev);
		game.boy.sprite.x -= ev.velocityX * 30;
	});

	var endGame = function(){
		// show end screen
		TweenLite.to($('canvas'), 1, {autoAlpha: 0});
		TweenLite.to($('#game-over'), 1, {autoAlpha: 1});

		$('.fb-share-btn').addEventListener('click', function(){
			var url = 'https://www.facebook.com/sharer/sharer.php?u=';
			url += 'https://www.indiegogo.com/projects/thing-on-the-beach-film-a-monster-lurks/x/7314522';
			window.open(url, '_blank', 'width=600, height=400');
		});
		$('.replay-btn').addEventListener('click', function(){
			window.location.hash = 'replay';
			window.location.reload();
		});
		ended = true;
		var currentStoryboardIndex = 0;
		var imgs = $$('.storyboards img');

		setInterval(function(){
			TweenLite.to(imgs[currentStoryboardIndex], 1, {autoAlpha: 0});
			currentStoryboardIndex ++;
			currentStoryboardIndex = currentStoryboardIndex % 10;
			TweenLite.to(imgs[currentStoryboardIndex], 1, {autoAlpha: 1});
		}, 2500);
	};
	game.gameOver = endGame;
	game.onBoyDamaged = function(){
		console.log('onBoyDamaged');
		TweenLite.fromTo(filter.matrix, 1, {1:1, 2:1, 3:1}, {1:0, 2:0, 3:0});
	};

	var ended = false;
	var update = function(){
		if(ended) return;
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

	if(window.location.search.match('thanks') === null){
		$('.storyboards').style.display = 'none';
	}
	
	if(window.location.hash.match() !== null){
		startGame();
	}else{
		showSplash();
	}
	// endGame();

})();


